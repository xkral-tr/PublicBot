const ServerSchema = require('../database/ServerSchema');
const { ServerDefaultSchema } = require('../database/SchemaDefault');
const { SetMessage, ErrorMessage } = require('../utils/Messages');
const { UpdateOrCreate } = require('../database/CRUD');
const { RequirePermission } = require('../utils/Permission');
const Argument = require('../Argument');
const Mustache = require('mustache');

const languages = require('../../locales/__languages__.json');
const locale = require('../utils/Localization');

module.exports = {
    name: 'set-language',
    description: 'Set language',
    pattern: 'language:required',
    category: 'settings',
    execute(client, message, args, data) {
        // arguments.checkArguments('ANAN');
        const Arguments = new Argument(args, this.pattern, false);

        const language = Arguments.getArgument('language:required');

        const update = { language: language };
        const query = { guildId: message.guild.id };

        const server = ServerDefaultSchema({
            guildId: message.guild.id,
            language: language,
        });

        if (RequirePermission(message, data.modRoles)) {
            if (languages[language]) {
                UpdateOrCreate(ServerSchema, server, query, update, true)
                    .then((result) => {
                        console.log(result);
                        SetMessage(
                            message,
                            Mustache.render(
                                locale(
                                    result.language || data.language,
                                    'set_to'
                                ),
                                {
                                    what: locale(
                                        result.language || data.language,
                                        'language'
                                    ),
                                    to: languages[language],
                                }
                            ),
                            []
                        );
                    })
                    .catch((err) => {
                        message.channel.send(locale(data.language, 'problem'));
                    });
            } else {
                ErrorMessage(
                    message,
                    locale(data.language, 'language_not_found'),
                    []
                );
            }
        } else {
            ErrorMessage(message, locale(data.language, 'no_permission'), []);
        }
    },
};
