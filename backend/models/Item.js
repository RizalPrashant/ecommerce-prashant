
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    instock: { type: Boolean, default: false },
    listeddate: { type: Date },
});

module.exports = mongoose.model('Item', itemSchema);