import mongoose from "mongoose";

const emailValidation = new mongoose.Schema({
    email: String,
    password: String,
    code: String,
    createdAt: {
        type: Date,
        expires: 300,
        default: Date.now
    },
});

export default mongoose.model('evalidation', emailValidation);