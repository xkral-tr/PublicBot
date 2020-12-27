const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'deneme',
    description: 'PING DESC',
    pattern: 'argument:required bruh:required',
    execute(client, message, args, data) {
        const embed = new MessageEmbed().addField(
            ' <a:3716_ArrowRightGlow:788071919966093372> Hi bro',
            '**Yönetici Komutlarını Listeler**'
        );
        message.channel.send(embed);
    },
};
