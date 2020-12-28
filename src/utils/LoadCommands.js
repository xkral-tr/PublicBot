////////////////////////////////////////
///
///     ContentChecker.js
///
////////////////////////////////////////
///    load all commands from
///    commands path.
////////////////////////////////////////

const glob = require('glob');
const path = require('path');
const settings = require('../../settings.json');
const { Collection } = require('discord.js');

const commands = new Collection();
const extension = 'js';

const loadCommands = (commandsPath) => {
    return new Promise((resolve, reject) => {
        glob(
            path.join(__dirname, commandsPath, `**/*.${extension}`),
            (err, files) => {
                if (err) reject('Directory not found.');
                else {
                    if (files.length === 0) resolve('There is no command.');
                    else {
                        for (const file of files) {
                            const command = require(file);
                            commands.set(command.name, command);
                        }
                        resolve('All commands loaded.');
                    }
                }
            }
        );
    });
};

module.exports = {
    loadCommands: loadCommands,
    extension: extension,
    commands: commands,
};
