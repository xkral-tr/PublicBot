const Argument = require('../Argument');
const getFromMention = require('../utils/Mention');
const { ErrorMessage, SuccessMessage } = require('../utils/Messages');

module.exports = {
    name: 'kick',
    description: 'Kick someone',
    pattern: 'user:required',
    spread: true,
    execute(client, message, args, data) {
        // Check author has "ban" permission
        if (message.member.hasPermission('KICK_MEMBERS')) {
            if (message.mentions.members.first()) {
                message.mentions.members
                    .first()
                    .kick()
                    .then((member) => {
                        //console.log(mentionUser);
                        SuccessMessage(
                            message,
                            `User **${member.displayName}** kicked succesfully`,
                            []
                        );
                    })
                    .catch((error) => {
                        ErrorMessage(message, `Failed to kick: ${error}`, []);
                    });
            } else {
                ErrorMessage(message, 'You need to mention a user', []);
            }
        } else {
            ErrorMessage(message, 'You dont have kick permission', []);
        }
    },
};
