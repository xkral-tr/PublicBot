const { UpdateOrCreate } = require('../database/CRUD');
const ServerSchema = require('../database/ServerSchema');
const { ErrorMessage, SuccessMessage } = require('../utils/Messages');
const Argument = require('../Argument');
const { ServerDefaultSchema } = require('../database/SchemaDefault');
const { RequirePermission } = require('../utils/Permission');

module.exports = {
    name: 'removemod',
    description: 'Removes mod role',
    pattern: 'role:required',
    execute(client, message, args, data) {
        const Arguments = new Argument(args, this.pattern, true);

        const query = { guildId: message.guild.id };
        const server = ServerDefaultSchema(query);
        const role = Arguments.getArgument('role:required');

        console.log(role);
        if (RequirePermission(message, data.modRoles)) {
            if (data.modRoles.includes(role)) {
                const update = {
                    $pull: { modRoles: role },
                };
                UpdateOrCreate(ServerSchema, server, query, update)
                    .then((result) => {
                        SuccessMessage(
                            message,
                            `Succesfully removed ${role} from moderator role list`,
                            []
                        );
                    })
                    .catch(() => {
                        ErrorMessage(
                            message,
                            'Failed to remove role from moderator role list',
                            []
                        );
                    });
            } else {
                ErrorMessage(
                    message,
                    'Already this role is not a moderator role',
                    []
                );
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
