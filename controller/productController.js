
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { uploadFilesToCloudinary } = require("../utils/features");
const Product = require("../model/productModel");
const ApiFeatures = require("../utils/apiFeatures");

// create new product 
exports.createNewProduct = catchAsyncErrors(async (req, res, next) => {

    // let images = []
    // if (typeof req.body.images === "String") {
    //     images.push(req.body.images);
    // } else {
    //     images = req.body.images
    // }

    // const imageLink = [];
    // for (let i = 0; i < images.length; i++) {
    //     const result = await uploadFilesToCloudinary([images[i]]);
    //     imageLink.push(result[0].url)
    // }
    // const product = await Product.create({
    //     user: req.user.id,
    //     name: req.body.name,
    //     price: req.body.price,
    //     brand: req.body.brand,
    //     category: req.body.category,
    //     description: req.body.description,
    //     Stock: req.body.countInStock,
    //     rating: req.body.rating,
    //     numOfReviews: req.body.numReviews,
    //     reviews:req.body.reviews,
    //     images: imageLink,
    // });
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


    const apiFeature = new ApiFeatures(Product.find(),req.query)
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



