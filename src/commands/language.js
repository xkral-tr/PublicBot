const ServerSchema = require('../database/ServerSchema');
const { ServerDefaultSchema } = require('../database/SchemaDefault');
const { SetMessage } = require('../utils/Messages');
const { UpdateOrCreate } = require('../database/CRUD');
const { RequirePermission } = require('../utils/Permission');
const Argument = require('../Argument');

module.exports = {
    name: 'set-language',
    description: 'Set language',
    pattern: 'language:required',
    execute(client, message, args, data) {
        // arguments.checkArguments('ANAN');
        const Arguments = new Argument(args, this.pattern, true);

        const language = Arguments.getArgument('language:required');

        const update = { language: language };
        const query = { guildId: message.guild.id };

        const server = ServerDefaultSchema({
            guildId: message.guild.id,
            language: language,
        });

        if (RequirePermission(message, data.modRoles)) {
            UpdateOrCreate(ServerSchema, server, query, update)
                .then(() => {
                    SetMessage(message, 'Language', language, []);
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
