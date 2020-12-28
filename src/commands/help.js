const { MessageEmbed } = require('discord.js');
const Argument = require('../Argument');
const { commands } = require('../utils/LoadCommands');
const locale = require('../utils/Localization');
const Mustache = require('mustache');

module.exports = {
    name: 'help',
    description: 'help_description',
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
                Mustache.render(locale(data.language, 'asked_for_help'), {
                    user: message.author.username,
                }),
                message.author.displayAvatarURL()
            )
            .setImage(
                'https://raw.githubusercontent.com/xkral-tr/PublicBot/master/images/title2.png'
            )
            .setDescription(locale(data.language, this.description));
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
                            .addField(
                                locale(data.language, 'description'),
                                command.description
                            )
                            .addField(
                                locale(data.language, 'usage_of_command'),
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
                    locale(data.language, 'category_settings_desc')
                )
                .addField(
                    '<:security:793117769917923409> Moderation',
                    locale(data.language, 'category_moderation_desc')
                )
                .addField(
                    '<:fun:793116072035221506> Fun',
                    locale(data.language, 'category_fun_desc')
                )
                .addField(
                    '<:public:793116324875599952> BOT',
                    locale(data.language, 'category_bot_desc')
                );
        }

        embed
            .addFields(Helpers)
            .addField(
                '<:github:792506877195714631> GITHUB',
                locale(data.language, 'github'),
                false
            )

            .setTimestamp(new Date());

        message.channel.send(embed);
    },
};
