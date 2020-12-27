////////////////////////////////////////
///
///     OnMessage.js
///
////////////////////////////////////////
///     On Message.
////////////////////////////////////////

const settings = require('../../settings.json'); // SETTINGS
const { commands } = require('../utils/LoadCommands');
const { CmdDoneLog, CmdErrorLog } = require('../utils/Log');
const { FindOrCreate } = require('../database/CRUD');
const ServerSchema = require('../database/ServerSchema');
const mongoose = require('mongoose');
const Argument = require('../Argument');
const { get } = require('http');
const OnMessage = (client, message) => {
    // BOT Check
    if (message.author.bot) return;

    const server = new ServerSchema({
        _id: mongoose.Types.ObjectId(),
        guildId: message.guild.id,
        language: settings.defaultLanguage,
        prefix: settings.prefix,
    });

    // Command Handling.

    FindOrCreate(ServerSchema, server, { guildId: message.guild.id })
        .then((result) => {
            const args = message.content
                .slice(result.prefix.length)
                .trim()
                .split(' ');

            const command = args.shift().toLowerCase(); // GET COMMAND

            if (message.content.startsWith(result.prefix)) {
                if (commands.has(command)) {
                    let getCommand = commands.get(command);
                    // TODO: Content check if content is image

                    // Check Argument
                    let Arguments = new Argument(
                        args,
                        getCommand.pattern || '',
                        getCommand.spread || false
                    );

                    if (
                        Arguments.checkArguments(
                            message,
                            `${result.prefix}${getCommand.name}`
                        )
                    ) {
                        getCommand.execute(client, message, args, result);
                        CmdDoneLog(`Command '${command}' executed.`);
                    }
                } else {
                    CmdErrorLog(`Command '${command}' not found!`);
                    return;
                }
            }
        })
        .catch((err) => {
            CmdErrorLog(err);
            message.channel.send('I have a database problem!');
        });
};

module.exports = OnMessage;
