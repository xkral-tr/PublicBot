module.exports = {
    name: 'test',
    description: 'This is for development',
    pattern: '',
    spread: false,
    execute(client, message, args, data) {
        message.channel.send('HI');
    },
};
