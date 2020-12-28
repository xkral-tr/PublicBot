const Argument = require('../Argument');
const locale = require('../utils/Localization');
const { ErrorLog } = require('../utils/Log');
const { ErrorMessage, SuccessMessage } = require('../utils/Messages');
const Mustache = require('mustache');

module.exports = {
    name: 'ban',
    description: 'Ban someone',
    pattern: 'user:required reason',
    category: 'moderation',
    spread: true,
    execute(client, message, args, data) {
        const permission = 'Ban';

        const Arguments = new Argument(args, this.pattern, true);
        // Check author has "ban" permission
        if (message.member.hasPermission('BAN_MEMBERS')) {
            if (message.mentions.members.first()) {
                const reason = Arguments.getArgument('reason');
                message.mentions.members
                    .first()
                    .ban()
                    .then((member) => {
                        SuccessMessage(
                            message,
                            Mustache.render(
                                locale(data.language, 'successfully_banned'),
                                { name: member.displayName }
                            ),
                            [
                                {
                                    name: locale(data.language, 'reason'),
                                    value:
                                        reason != ''
                                            ? reason
                                            : locale(
                                                  data.language,
                                                  'reason_not_specified'
                                              ),
                                },
                            ]
                        );
                    })
                    .catch((error) => {
                        ErrorLog(error);
                        ErrorMessage(
                            message,
                            Mustache.render(
                                locale(data.language, 'failed_to'),
                                { what: permission }
                            ),
                            []
                        );
                    });
            } else {
                ErrorMessage(
                    message,
                    locale(data.language, 'need_mention_user'),
                    []
                );
            }
        } else {
            ErrorMessage(
                message,
                Mustache.render(locale(data.language, 'permission_required'), {
                    permission: permission,
                }),
                []
            );
        }
    },
};
