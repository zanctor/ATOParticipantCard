const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Card = new Schema({
    number: {type: String, required: true, unique: true},
    dateIssued: Date,
    status: Number,
    holder: {type: Schema.Types.ObjectId, ref: 'User'}
});

Card.plugin(mongooseDelete);

module.exports = mongoose.model('Card', Card);