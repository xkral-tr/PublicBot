////////////////////////////////////////
///
///     Mention.js
///
////////////////////////////////////////
///    Get Mention
////////////////////////////////////////

const { get } = require('http');
const { ErrorLog } = require('./Log');
const { ErrorMessage } = require('./Messages');

// FIXME: Channel and Role not working.

const getMention = (collection, mention, start, end) => {
    if (mention.startsWith(start) && mention.endsWith(end)) {
        let result = mention.slice(start.length, -1 * end.length);

        if (result.startsWith('!')) {
            result = result.slice(1);
        }

        return collection.cache.get(result);
    }

    return null;
};

const getFromMention = (client, message, type, mention) => {
    const CHANNEL = 0;
    const USER = 1;
    const TAG = 2;

    if (!mention) {
        ErrorLog('Mention is null');
        return;
    }

    if (type === CHANNEL) {
        return getMention(client.channels, mention, '<#', '>');
    } else if (type === USER) {
        return getMention(client.users, mention, '<@', '>');
    } else if (type === TAG) {
        return getMention(client.roles, mention, '<@&', '>');
    } else {
        ErrorLog('Type not valid');
        return;
    }
};

module.exports = getFromMention;
