const { UpdateOrCreate } = require('../database/CRUD');
const ServerSchema = require('../database/ServerSchema');
const { ServerDefaultSchema } = require('../database/SchemaDefault');
const Argument = require('../Argument');
const {
    ErrorMessage,
    SuccessMessage,
    InfoMessage,
} = require('../utils/Messages');

const {
    RoleExist,
    RequirePermission,
    RoleExistInGuild,
} = require('../utils/Permission');
const locale = require('../utils/Localization');

const { CmdErrorLog } = require('../utils/Log');
const Mustache = require('mustache');

module.exports = {
    name: 'addmodrole',
    description: 'command_addmodrole',
    pattern: 'role:required',
    category: 'moderation',
    execute(client, message, args, data) {
        const Arguments = new Argument(args, this.pattern, true);

        const query = { guildId: message.guild.id };
        const server = ServerDefaultSchema(query);
        const role = Arguments.getArgument('role:required');
        const update = {
            $push: { modRoles: role },
        };

        if (RequirePermission(message, data.modRoles)) {
            if (RoleExistInGuild(message, role)) {
                if (!RoleExist(data.modRoles, role)) {
                    UpdateOrCreate(ServerSchema, server, query, update)
                        .then((result) => {
                            SuccessMessage(
                                message,
                                Mustache.render(
                                    locale(
                                        data.language,
                                        'successfully_role_add'
                                    ),
                                    { role: role }
                                ),
                                []
                            );
                        })
                        .catch((err) => {
                            CmdErrorLog(err);
                            message.channel.send(
                                locale(data.language, 'problem')
                            );
                        });
                } else {
                    InfoMessage(
                        message,
                        locale(data.language, 'role_already_exist'),
                        []
                    );
                }
            } else {
                ErrorMessage(
                    message,
                    locale(data.language, 'role_not_found'),
                    []
                );
            }
        } else {
            ErrorMessage(message, locale(data.language, 'no_permission'), []);
        }
    },
};
