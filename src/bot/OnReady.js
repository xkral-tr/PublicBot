////////////////////////////////////////
///
///     OnReady.js
///
////////////////////////////////////////
///     On Ready.
////////////////////////////////////////

const settings = require('../../settings.json'); // SETTINGS
const chalk = require('chalk'); // For Colorful Logs.
const { loadCommands, commands } = require('../utils/LoadCommands');
const center = require('center-align'); // Text calign center
const ConnectToDatabase = require('../database/ConnectToDatabase'); // For Database Connection
const { InfoLog, ErrorLog, DoneLog } = require('../utils/Log'); // Logs

const OnReady = (client) => {
    client.user.setPresence({
        status: settings.status,
        activity: {
            name: settings.description,
            type: settings.presenceType,
        },
    });

    console.log(center(chalk.blueBright(settings.botName), 39));
    console.log(center(chalk.blueBright(`v${settings.version}`), 39));

    InfoLog('Bot is alive');

    // Database Connection
    ConnectToDatabase()
        .then(() => {
            DoneLog('Connected to Database');
        })
        .catch((err) => {
            ErrorLog(err);
        });

    loadCommands(settings.commandsDir)
        .then((msg) => {
            DoneLog(msg);
        })
        .catch((err) => {
            ErrorLog(err);
        });
};

module.exports = OnReady;
