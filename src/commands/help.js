const { MessageEmbed } = require('discord.js');
const Argument = require('../Argument');
const { commands } = require('../utils/LoadCommands');

module.exports = {
    name: 'help',
    description:
        'When we make our **website**. You will be able to adjust your settings from the **dashboard**',
    pattern: 'category_or_command',
    execute(client, message, args, data) {
        console.log(data);

        const categories = ['moderation', 'fun', 'bot', 'settings'];
        const Helpers = [];

        const Arguments = new Argument(args, this.pattern, false);

        const category_or_command = Arguments.getArgument(
            'category_or_command'
        );

        const embed = new MessageEmbed()
            .setTitle('<:2713_Microphone:793036662367715338> HELP')
            .setColor('RANDOM')
            .setFooter(
                `${message.author.username} asked for help`,
                message.author.displayAvatarURL()
            )
            .setImage(
                'https://raw.githubusercontent.com/xkral-tr/PublicBot/master/images/title2.png'
            )
            .setDescription(this.description);
        if (category_or_command) {
            commands.forEach((command) => {
                if (command.name != this.name) {
                    if (
                        categories.includes(category_or_command) &&
                        command.category.toLowerCase() === category_or_command
                    ) {
                        // Category HELP
                        embed.setTitle(
                            `${category_or_command.toUpperCase()} HELP`
                        );
                        let commandString = `${command.name} `;

                        for (pattern of command.pattern.split(' ')) {
                            const key = pattern.slice(
                                0,
                                -1 * 'required:'.length
                            );
                            commandString += `**\`<${key}>\`** `;
                        }

                        Helpers.push({
                            name: `<a:ruby:792474082196979722> ${data.prefix}${command.name}`,
                            value: `\`${command.description}\``,
                            inline: false,
                        });
                    } else if (command.name === category_or_command) {
                        // COMMAND HELP
                        embed
                            .setTitle(`${data.prefix}${command.name}`)
                            .setDescription('')
                            .setImage('')
                            .addField('Description:', command.description)
                            .addField(
                                'Usage Of Command',
                                Arguments.usage(
                                    data.prefix + command.name,
                                    this.pattern.split(' ')
                                )
                            );
                    }
                }
            });
        } else {
            embed
                .addField(
                    '<:gears:793116264582479892> Settings',
                    "Change the bot's settings"
                )
                .addField(
                    '<:security:793117769917923409> Moderation',
                    'You can keep this server safe with these excellent commands'
                )
                .addField(
                    '<:fun:793116072035221506> Fun',
                    "Let's have some fun"
                )
                .addField(
                    '<:public:793116324875599952> BOT',
                    'Bot bot bot bot bot!'
                );
        }

        embed
            .addFields(Helpers)
            .addField(
                '<:github:792506877195714631> GITHUB',
                'Did you know that Public Bot is an **open source** project?\n**Our github link** [here](https://github.com/xkral-tr/PublicBot)',
                false
            )

            .setTimestamp(new Date());

        message.channel.send(embed);
    },
};
