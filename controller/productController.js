
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../model/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
// create new product 
exports.createNewProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }
    const imageLink = [];
    for (let i = 0; i < images?.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });
        imageLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }
    req.body.images = imageLink;
    req.body.user = req.user.id;
    // console.log(req.body);
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
        message: "Product Created Successfully",
    });
});

// get products 
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 10;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();
    let products = await apiFeature.query;
    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage);
    products = await apiFeature.query.clone();
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
        message: "All Products Fetched Successfully",
    });
});

// get product details 
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }
    res.status(200).json({
        success: true,
        product,
        message: "Product Fetched Successfully",
    });
});

//delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
    });
});
//update product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    // Process images if provided
    let images = [];
    if (req.body.images) {
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        // Upload new images to Cloudinary
        const imageLink = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });
            imageLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // Delete old images from Cloudinary if needed
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        // Update product's images field
        req.body.images = imageLink;
    }

    // Update the product with new data
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
        message: "Product Updated Successfully",
    });
});



// get all product by admin 
exports.getAllProductsAdmin = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products,
        message: "All Products Fetched Successfully",
    });
});



// Create new review or update the review 
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (req.rating = rating), (rev.comment = comment);
        });

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });


    res.status(200).json({
        success: true,
    })

});


// get all product review

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    //   here i use query bcz I need to find review from product object 
    if (!product) {
        return next(new ErrorHandler(`Product not found`, 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
});

// delete product reviews 

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler(`product not found`, 404));
    }
    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });
    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;

    }

    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }

    );
    res.status(200).json({
        success: true,
    });
});