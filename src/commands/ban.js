const Argument = require('../Argument');
const getFromMention = require('../utils/Mention');
const { ErrorMessage, SuccessMessage } = require('../utils/Messages');

module.exports = {
    name: 'ban',
    description: 'Ban someone',
    pattern: 'user:required reason',
    spread: true,
    execute(client, message, args, data) {
        const Arguments = new Argument(args, this.pattern, true);
        const USER = 1;
        // Check author has "ban" permission
        if (message.member.hasPermission('BAN_MEMBERS')) {
            if (message.mentions.members.first()) {
                const reason = Arguments.getArgument('reason');
                message.mentions.members
                    .first()
                    .ban({ reason: reason })
                    .then((member) => {
                        console.log(mentionUser);
                        SuccessMessage(
                            message,
                            `User **${member.displayName}** banned succesfully`,
                            [
                                {
                                    name: 'Reasons',
                                    value:
                                        reason != ''
                                            ? reason
                                            : 'Reason not specified                            ',
                                },
                            ]
                        );
                    })
                    .catch((error) => {
                        ErrorMessage(message, `Failed to ban`, []);
                    });
            } else {
                ErrorMessage(message, 'You need to mention a user', []);
            }
        } else {
            ErrorMessage(message, 'You dont have ban permission', []);
        }
    },
};
