////////////////////////////////////////
///
///     Argument.js
///
////////////////////////////////////////
///     Get Argument
////////////////////////////////////////

const { ErrorLog } = require('./utils/Log');
const { ErrorMessage } = require('./utils/Messages');
const locale = require('./utils/Localization');

class Argument {
    constructor(args, pattern, spread) {
        this.args = args;
        this.pattern = pattern;
        this.spread = spread;
    }

    usage(name, patternArray) {
        const required = ':required';

        let commandString = `\`${name}\` `;
        for (let pattern of patternArray) {
            if (pattern.endsWith(required)) {
                const key = pattern.slice(0, -1 * required.length);
                commandString += `\`<${key}>\` `;
            } else {
                commandString += `\`<${pattern}>\` `;
            }
        }

        return commandString;
    }

    // Check Arguments
    checkArguments(message, name, lang) {
        const patternArray = this.pattern.split(' ');

        for (let pattern of patternArray) {
            const required = ':required';

            if (pattern.endsWith(required)) {
                // Argument required
                const value = this.getArgument(pattern);

                console.log(value);
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
                        ErrorMessage(message, locale(lang, 'passed_argument'), [
                            {
                                name: locale(lang, 'usage_of_command'),
                                value: commandString,
                            },
                        ]);
                    }

                    return false;
                }
            }
        }
        return true;
    }

    getArgument(arg) {
        const patternArray = this.pattern.split(' ');
        let index = patternArray.indexOf(arg);

        this.args = this.args.join(' ').trim().split(' ');

        if (index === -1) {
            ErrorLog('Argument not found.');
            return null;
        } else if (this.spread && index == patternArray.length - 1) {
            //console.log(this.args.splice(0, patternArray.length - 1).join(' '));

            return this.args.slice(patternArray.length - 1).join(' ');
        } else {
            return this.args[index];
        }
    }
}

module.exports = Argument;
