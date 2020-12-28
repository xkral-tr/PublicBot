const { UpdateOrCreate } = require('../database/CRUD');
const ServerSchema = require('../database/ServerSchema');
const { ErrorMessage, SuccessMessage } = require('../utils/Messages');
const Argument = require('../Argument');
const { ServerDefaultSchema } = require('../database/SchemaDefault');
const { RequirePermission } = require('../utils/Permission');
const locale = require('../utils/Localization');
const Mustache = require('mustache');

module.exports = {
    name: 'removemodrole',
    description: 'Removes mod role',
    pattern: 'role:required',
    category: 'moderation',
    execute(client, message, args, data) {
        const Arguments = new Argument(args, this.pattern, true);

        const query = { guildId: message.guild.id };
        const server = ServerDefaultSchema(query);
        const role = Arguments.getArgument('role:required');

        if (RequirePermission(message, data.modRoles)) {
            if (data.modRoles.includes(role)) {
                const update = {
                    $pull: { modRoles: role },
                };
                UpdateOrCreate(ServerSchema, server, query, update)
                    .then((result) => {
                        SuccessMessage(
                            message,
                            Mustache.render(
                                locale(data.language, 'successfully_removed'),
                                { role: role }
                            ),
                            []
                        );
                    })
                    .catch((err) => {
                        SetMessage(
                            message,
                            locale(data.language, 'remove_mod_failed'),
                            []
                        );
                    });
            } else {
                ErrorMessage(
                    message,
                    locale(data.language, 'not_mod_role_already'),
                    []
                );
            }
        } else {
            ErrorMessage(message, locale(data.language, 'no_permission'), []);
        }
    },
};
