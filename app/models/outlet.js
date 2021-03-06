const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Outlet = new Schema({
    name: String,
    address: String,
    discountType: String,
    type: Number,
    latitude: Number,
    longitude: Number,
    provider: {type: Schema.Types.ObjectId, ref: 'User'}
});

Outlet.plugin(mongooseDelete, {overrideMethods: true});

module.exports = mongoose.model('Outlet', Outlet);