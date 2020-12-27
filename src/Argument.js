////////////////////////////////////////
///
///     Argument.js
///
////////////////////////////////////////
///     Get Argument
////////////////////////////////////////

const { ErrorLog } = require('./utils/Log');
const { MessageEmbed } = require('discord.js');
const { ErrorMessage } = require('./utils/Messages');
const { pattern } = require('./commands/language');

class Argument {
    constructor(args, pattern, spread) {
        this.args = args;
        this.pattern = pattern;
        this.spread = spread;
    }

    // Check Arguments
    checkArguments = (message, name) => {
        const patternArray = this.pattern.split(' ');

        for (let pattern of patternArray) {
            const required = ':required';

            if (pattern.endsWith(required)) {
                // Argument required
                const value = this.getArgument(pattern);

                if (!value) {
                    // Null argument
                    let commandString = `\`${name}\` `;
                    for (let pattern2 of patternArray) {
                        if (pattern2.endsWith(required)) {
                            const key = pattern2.slice(0, -1 * required.length);
                            commandString += `\`<${key}>\` `;
                        } else {
                            commandString += `\`<${pattern2}>\` `;
                        }
                    }

                    if (message) {
                        ErrorMessage(message, 'You passed required argument', [
                            { name: 'Usage of Command', value: commandString },
                        ]);
                    }

                    return false;
                }
            }
        }
        return true;
    };

    getArgument = (arg) => {
        const patternArray = this.pattern.split(' ');
        let index = patternArray.indexOf(arg);

        //console.log(index);
        if (index === -1) {
            ErrorLog('Argument not found.');
            return null;
        } else if (this.spread && index == patternArray.length - 1) {
            return this.args
                .splice(patternArray.length - 1)
                .join(' ')
                .trim();
        } else {
            if (arg === '') {
                index++;
            } else {
                return this.args[index];
            }
        }
    };
}

module.exports = Argument;
