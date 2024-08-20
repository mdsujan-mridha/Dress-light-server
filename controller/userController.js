
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { uploadFilesToCloudinary } = require("../utils/features");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");

exports.createUser = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.body.file);
    const { name, email, password } = req.body;
    const file = req.file;
    if (!file) return next(new ErrorHandler("Please Upload Avatar"));
    const result = await uploadFilesToCloudinary([file]);
    // const result = await cloudinary.v2.uploader.upload(file);
    // console.log(result);

    const avatar = {
        public_id: result[0].public_id,
        url: result[0].url,
    }

    // console.log(mycloud);
    
    const user = await User.create({
        name,
        email,
        password,
        avatar,
    });
    sendToken(user, 201, res);
});

exports.login = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(user, 200, res)
})