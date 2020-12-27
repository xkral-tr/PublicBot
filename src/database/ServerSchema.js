////////////////////////////////////////
///
///     ServerSchema.js
///
////////////////////////////////////////
///     Database Schema
////////////////////////////////////////

const mongoose = require('mongoose');

const ServerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildId: String,
    language: String,
    prefix: String,
    modRoles: Array,
});

module.exports = mongoose.model('Server', ServerSchema, 'Server');
