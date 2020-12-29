const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const Argument = require('../Argument');
const locale = require('../utils/Localization');
const { CmdErrorLog } = require('../utils/Log');
const { ErrorMessage } = require('../utils/Messages');

module.exports = {
    name: 'number',
    description: 'command_number',
    pattern: 'number:required',
    spread: false,
    category: 'fun',
    execute(client, message, args, data) {
        const Arguments = new Argument(args, this.pattern, false);
        const number = Arguments.getArgument('number:required');
        if (!isNaN(number)) {
            axios
                .get(`http://numbersapi.com/${number}`)
                .then((response) => {
                    const embed = new MessageEmbed()
                        .setColor('YELLOW')
                        .setTitle(
                            `${locale(data.language, 'number')} ${number}`
                        )
                        .setDescription(response.data)
                        .setTimestamp(new Date());
                    message.channel.send(embed);
                })
                .catch((err) => {
                    CmdErrorLog(err);
                    message.channel.send(locale(data.language, 'problem'));
                });
        } else {
            ErrorMessage(message, locale(data.language, 'not_a_number'), []);
        }
    },
};
