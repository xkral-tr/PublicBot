const Argument = require('../Argument');
const locale = require('../utils/Localization');
const { ErrorMessage, SuccessMessage } = require('../utils/Messages');
const { RequirePermission } = require('../utils/Permission');
const Mustache = require('mustache');

module.exports = {
    name: 'unban',
    description: 'command_unban',
    pattern: 'user_id:required',
    spread: false,
    category: 'moderation',
    execute(client, message, args, data) {
        const Arguments = new Argument(args, 'user_id:required', false);
        const user_id = Arguments.getArgument('user_id:required');

        if (message.member.hasPermission('BAN_MEMBERS')) {
            message.guild.fetchBans().then((banneds) => {
                let bannedUser = banneds
                    .map((banned) => banned.user.id)
                    .filter((elem) => elem == user_id);
                // .filter((elem) => elem.id === user_id);
                console.log(banneds);
                // USer was banned
                if (bannedUser.length === 1) {
                    message.guild.members
                        .unban(bannedUser[0])
                        .then((user) => {
                            SuccessMessage(
                                message,
                                Mustache.render(
                                    locale(
                                        data.language,
                                        'successfully_unbanned'
                                    ),
                                    { name: user.username }
                                ),
                                []
                            );
                        })
                        .catch((err) => {
                            CmdErrorLog(err);
                            ErrorMessage(
                                message,
                                Mustache.render(
                                    locale(data.language, 'failed_to'),
                                    {
                                        what: 'Unban',
                                    }
                                ),
                                []
                            );
                        });
                } else {
                    ErrorMessage(
                        message,
                        locale(
                            data.language,
                            'not_banned_already_or_user_not_found'
                        ),
                        []
                    );
                }
            });
        } else {
            locale(data.language, 'no_permission');
        }
    },
};
