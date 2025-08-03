import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
    }],
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
        default: null,
    },
}, { timestamps: true });

// ✅ Pre-save hook for hashing password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // only hash if password is modified
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// ✅ Method to check password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// ✅ Method to generate JWT Access Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id, username: this.username, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: "15m" } // short-lived access token
    );
};

// ✅ Method to generate JWT Refresh Token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" } // longer-lived refresh token
    );
};

export const User = mongoose.model("User", userSchema);
