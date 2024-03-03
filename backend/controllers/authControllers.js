import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";

//Register user  =>  /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
    });

    sendToken(user, 201, res);
});

//Login user  =>  /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    //Find user in the database
    const user = await User.findOne({ email }).select("+password")

    if(!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    // Check if password is correct
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 200, res);
});

//Logout user => /api/v1/logout
export const logout = catchAsyncErrors( async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        message: "Logged Out",
    });
});

// Forgot password =>  /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {

    //Find user in the database
    const user = await User.findOne({ email: req.body.email });

    if(!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    // Get reset password token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    //Create reset password url 
    const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

    const message = getResetPasswordTemplate(user?.name, resetUrl);

    try {
        await sendEmail({
            email: user.email,
            subject: "Shopaholic Password Recovery",
            message,
        });

        res.status(200).json({
            message:`Email sent to: ${user.email}`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        return next(new ErrorHandler(error?.message,500));
    }

    sendToken(user, 200, res);
});