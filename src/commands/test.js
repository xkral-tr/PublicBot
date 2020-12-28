const Argument = require('../Argument');

module.exports = {
    name: 'test',
    description: 'This is for development',
    pattern: 'something:required something2',
    category: 'test',
    spread: true,
    execute(client, message, args, data) {
        const Arguments = new Argument(args, this.pattern, true);

        message.channel.send(Arguments.getArgument('something2'));
    },
};
