const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const User = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    gender: {type: Boolean, default: true},
    email: {type: String, required: true, unique: true},
    address: String,
    phone: String,
    password: {type: String, required: true},
    role: {type: Number, default: 1},
    avatarUrl: String,
    documentImage: String
});

User.plugin(mongooseDelete, {overrideMethods: true});

module.exports = mongoose.model('User', User);