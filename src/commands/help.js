const { MessageEmbed } = require('discord.js');
const { commands } = require('../utils/LoadCommands');

module.exports = {
    name: 'help',
    description: 'This is description',
    pattern: 'something',
    execute(client, message, args, data) {
        console.log(data);

        const Helpers = [];

        commands.forEach((command) => {
            if (command.name != this.name) {
                let commandString = `${command.name} `;

                for (pattern of command.pattern.split(' ')) {
                    const key = pattern.slice(0, -1 * 'required:'.length);
                    commandString += `**\`<${key}>\`** `;
                }

                Helpers.push({
                    name: `<a:ruby:792474082196979722> ${command.name}`,
                    value: command.description,
                    inline: false,
                });
            }
        });

        const embed = new MessageEmbed()
            .setTitle('HELP')
            .setColor('RANDOM')
            .setFooter(
                `${message.author.username} asked for help`,
                message.author.displayAvatarURL()
            )

            .addFields(Helpers)
            .addField(
                '<:github:792506877195714631> GITHUB',
                'Our github link [here](https://github.com/xkral-tr/PublicBot)',
                false
            )
            .setTimestamp(new Date())
            .setDescription(this.description);

        message.channel.send(embed);
    },
};
