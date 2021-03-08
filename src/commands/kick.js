const locale = require('../utils/Localization');
const { ErrorMessage, SuccessMessage } = require('../utils/Messages');
const Mustache = require('mustache');
module.exports = {
    name: 'kick',
    description: 'command_kick',
    pattern: 'user:required',
    category: 'moderation',
    spread: true,
    execute(client, message, args, data) {
        // Check author has "ban" permission
        const permission = 'Kick';

        if (message.member.hasPermission('KICK_MEMBERS')) {
            const member = message.mentions.members.first();
            if (member) {
                if ((message.author.id == message.guild.ownerID) || (message.member.roles.highest.position > member.roles.highest.position)) {
                    member
                        .kick()
                        .then(() => {
                            //console.log(mentionUser);
                            SuccessMessage(
                                message,
                                Mustache.render(
                                    locale(data.language, 'successfully_kicked'),
                                    { user: member.displayName }
                                ),
                                []
                            );
                        })
                        .catch((error) => {
                            ErrorMessage(
                                message,
                                Mustache.render(
                                    locale(data.language, 'failed_to'),
                                    { what: 'kick' }
                                ),
                                []
                            );
                        });
                } else {
                    ErrorMessage(
                        message,
                        locale(data.language, 'higher_rank_to_kick'),
                        []
                    );
                }
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
                Mustache(locale(data.language, 'permission_required'), {
                    permission: permission,
                }),
                []
            );
        }
    },
};
