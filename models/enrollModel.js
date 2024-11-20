const mongoose = require('mongoose');

const enrollSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    services: {
        type: [String],
        default: [],
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model('Enroll', enrollSchema);
