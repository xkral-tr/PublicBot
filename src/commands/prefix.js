const ServerSchema = require('../database/ServerSchema');
const Argument = require('../Argument');

const { ServerDefaultSchema } = require('../database/SchemaDefault');
const { UpdateOrCreate } = require('../database/CRUD');
const { SetMessage } = require('../utils/Messages');

const { RequirePermission } = require('../utils/Permission');
const Mustache = require('mustache');
const { CmdErrorLog } = require('../utils/Log');
const locale = require('../utils/Localization');

module.exports = {
    name: 'set-prefix',
    description: 'Set prefix to someting',
    pattern: 'prefix:required',
    category: 'settings',
    execute(client, message, args, data) {
        const Arguments = new Argument(args, this.pattern, false);

        const prefix = Arguments.getArgument('prefix:required');

        const update = { prefix: prefix };
        const query = { guildId: message.guild.id };

        const server = ServerDefaultSchema({
            guildId: message.guild.id,
            prefix: prefix,
        });

        if (RequirePermission(message, data.modRoles)) {
            UpdateOrCreate(ServerSchema, server, query, update, false)
                .then(() => {
                    SetMessage(
                        message,
                        Mustache.render(locale(data.language, 'set_to'), {
                            what: locale(data.language, 'prefix'),
                            to: prefix,
                        }),
                        []
                    );
                })
                .catch((err) => {
                    CmdErrorLog(err);
                    message.channel.send(locale(data.language, 'problem'));
                });
        } else {
            ErrorMessage(message, locale(data.language, 'no_permission'), []);
        }
    },
};
