module.exports = {

    Client: {

        bot_token: "", // Bot's token
        bot_status: "", // Bot's status
        bot_client_id: "", // Bot's ID

    },

    System: {

        vanity_role_system: true, // System status: true (on) / false (off)
        vanity_role_system_role_id: "", // Role to be given/taken when writing the text in the status
        vanity_role_system_guild_id: "", // Server where the system will work
        vanity_role_system_channel_id: "", // Channel where the system message will be sent
        vanity_role_system_status_text: "" // Text to be written in the status

    }

}