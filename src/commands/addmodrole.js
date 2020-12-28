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

module.exports = {
    name: 'addmodrole',
    description: 'Add role to moderator roles',
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
                                `Anyone with a ${role} role is now a moderator`,
                                []
                            );
                        })
                        .catch((err) => {
                            message.channel.send('Sorry. I have a problem.');
                        });
                } else {
                    InfoMessage(message, 'This role already exists', []);
                }
            } else {
                ErrorMessage(message, 'Role not found', []);
            }
        } else {
            ErrorMessage(
                message,
                'You do not have permission to use this command',
                []
            );
        }
    },
};
