import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            maxLength: 50,
        }, 
        email: {
            type: String,
            required: [true,'Please enter an email'],
            unique:true,
            lowercase:true
        },
        hashPassword: {
            type: String,
            required: true,
            minLength: 6,
        },
        role: {
            type: String,
            default: 'user',
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,

    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;