////////////////////////////////////////
///
///     Messages.js
///
////////////////////////////////////////
///    Fancy Messages.
////////////////////////////////////////

const { MessageEmbed, Message } = require('discord.js');

const SetMessage = (message, what, to, fields) => {
    const embed = new MessageEmbed()
        .setColor('BLUE')
        .addField(
            ':grey_question: SET',
            `${what} set to **${to}** success`,
            false
        )
        .setTimestamp(new Date())
        .addFields(fields)
        .setFooter(
            `${message.author.username} changed a setting`,
            message.author.displayAvatarURL()
        );

    message.channel.send(embed);
};

const ErrorMessage = (message, text, fields) => {
    const embed = new MessageEmbed()
        .setColor('RED')
        .setTimestamp(new Date())
        .addField('<a:no:793025696175751168> ERROR', text, false)
        .addFields(fields)
        .setFooter(
            `${message.author.username} got an error`,
            message.author.displayAvatarURL()
        );

    message.channel.send(embed);
};

const SuccessMessage = (message, text, fields) => {
    const embed = new MessageEmbed()
        .setColor('RED')
        .addField('<a:tick:793024486600736789> SUCCESS', text, false)
        .setTimestamp(new Date())
        .addFields(fields)
        .setFooter('', message.author.displayAvatarURL());

    message.channel.send(embed);
};

const InfoMessage = (message, text, fields) => {
    const embed = new MessageEmbed()
        .setColor('BLUE')
        .setTimestamp(new Date())
        .addField('<:info:792474125301317685> INFO', text, false)
        .addFields(fields)
        .setFooter('', message.author.displayAvatarURL());

    message.channel.send(embed);
};

module.exports = {
    SetMessage: SetMessage,
    ErrorMessage: ErrorMessage,
    SuccessMessage: SuccessMessage,
    InfoMessage: InfoMessage,
};
