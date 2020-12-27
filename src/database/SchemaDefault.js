////////////////////////////////////////
///
///     SchemaDefault.js
///
////////////////////////////////////////
///     Defaults here.
////////////////////////////////////////

const mongoose = require('mongoose');
const ServerSchema = require('./ServerSchema');
const settings = require('../../settings.json');

const ServerDefaultSchema = (overrides) => {
    return new ServerSchema({
        _id: overrides._id || mongoose.Types.ObjectId(),
        guildId: overrides.guildId,
        language: overrides.language || settings.defaultLanguage,
        prefix: overrides.prefix || settings.prefix,
        modRoles: [],
    });
};

module.exports = {
    ServerDefaultSchema: ServerDefaultSchema,
};
