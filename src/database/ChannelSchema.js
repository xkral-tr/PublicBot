////////////////////////////////////////
///
///     ChannelSchema.js
///
////////////////////////////////////////
///     Database Schema
////////////////////////////////////////

const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    server: String,
    contentCheck: { type: Boolean, default: false },
    swearCheck: { type: Boolean, default: false },
});

module.exports = mongoose.Model('Channel', ChannelSchema, 'Channel');
