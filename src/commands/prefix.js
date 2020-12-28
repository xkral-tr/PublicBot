const ServerSchema = require('../database/ServerSchema');
const Argument = require('../Argument');

const { ServerDefaultSchema } = require('../database/SchemaDefault');
const { UpdateOrCreate } = require('../database/CRUD');
const { SetMessage } = require('../utils/Messages');

const { RequirePermission } = require('../utils/Permission');

module.exports = {
    name: 'set-prefix',
    description: 'Set prefix to someting',
    pattern: 'prefix:required',
    category: 'settings',
    execute(client, message, args, data) {
        const Arguments = Argument(args, this.pattern, true);

        const prefix = Arguments.getArgument('prefix:required');

        const update = { prefix: prefix };
        const query = { guildId: message.guild.id };

        const server = ServerDefaultSchema({
            guildId: message.guild.id,
            prefix: prefix,
        });

        if (RequirePermission(message, data.modRoles)) {
            UpdateOrCreate(ServerSchema, server, query, update)
                .then(() => {
                    SetMessage(message, 'Prefix', prefix, []);
                })
                .catch((err) => {
                    message.channel.send('Sorry. I have a problem.');
                });
        } else {
            ErrorMessage(
                message,
                'You do not have permission to use this command',
                []
            );
        }
    },
};
