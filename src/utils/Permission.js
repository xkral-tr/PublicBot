////////////////////////////////////////
///
///     Permission.js
///
////////////////////////////////////////
///    Check permissions.
////////////////////////////////////////

const { Role } = require('discord.js');

const OWNER = 0;
const MOD = 1;

const RoleExistInGuild = (message, roleName) => {
    if (message.guild.roles.cache.find((role) => role.name === roleName)) {
        return true;
    }
};

const RoleExist = (roles, roleName) => {
    for (const role of roles) {
        if (role === roleName) {
            return true;
        }
    }

    return false;
};

const RequirePermission = (message, mods) => {
    // User is owner of server.
    if (message.member.id === message.guild.ownerID) {
        return true;
    } else {
        for (const mod of mods) {
            // User is mod
            if (
                message.member.roles.find((role) => role.name == mod) &&
                RoleExistInGuild(message, mod)
            ) {
                return true;
            }
        }

        return false;
    }
};

module.exports = {
    RequirePermission: RequirePermission,
    RoleExist: RoleExist,
    RoleExistInGuild: RoleExistInGuild,
};
