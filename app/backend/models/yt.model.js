const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define table
const downloadSchema = new Schema({
    url: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    format: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    total: {
        type: Number,
        required: true,

    },
},
    {
        timestamps: true,
    }
);

const Download = mongoose.model('Downloads', downloadSchema);

module.exports = Download;



