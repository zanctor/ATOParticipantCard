const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Outlet = new Schema({
    address: String,
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Outlet', Outlet);