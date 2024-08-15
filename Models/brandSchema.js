const mongoose = require('mongoose');
const { Schema } = mongoose;

const brandSchema = new Schema({
    brandName: {
        type: String,
        required: true
    },
    brandImage: {
        type: [String],
        required: true
    },
    isBlocked: {  // Typo corrected from isBloced to isBlocked
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Pass the schema object instead of a string
const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
