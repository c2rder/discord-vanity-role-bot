const { Client, Partials, ActivityType, Events } = require("discord.js");

const client = new Client({ intents: 131071, partials: Object.values(Partials).filter((x) => typeof x === "string"), shards: "auto" });

const config = require("./config.js")

require("advanced-logs");

client.on(Events.ClientReady, async () => {

  console.success(``, `[CLIENT] Successfully connected to Discord API.`);

  client.user.setActivity({ name: config.Client.bot_status, type: ActivityType.Custom, state: config.Client.bot_status });

})

client.on(Events.PresenceUpdate, async (oldPresence, newPresence) => {

  const vanity_role_system = config.System.vanity_role_system;
  const vanity_role_system_role_id = config.System.vanity_role_system_role_id;
  const vanity_role_system_guild_id = config.System.vanity_role_system_guild_id;
  const vanity_role_system_channel_id= config.System.vanity_role_system_channel_id;
  const vanity_role_system_status_text= config.System.vanity_role_system_status_text;

  const vanity_role_system_role = newPresence.guild.roles.cache.get(vanity_role_system_role_id);
  const vanity_role_system_guild = client.guilds.cache.get(vanity_role_system_guild_id);
  const vanity_role_system_channel = newPresence.guild.channels.cache.get(vanity_role_system_channel_id);

  if(vanity_role_system === true) {

    if(vanity_role_system_role_id.length < 0 || vanity_role_system_guild_id.length < 0 || vanity_role_system_channel_id.length < 0 || vanity_role_system_status_text.length < 0) {
      return console.error(``, `[VANITY ROLE SYSTEM] Settings are not configured.`);
    }

  if (newPresence.guild.id !== vanity_role_system_guild_id) return;
  if (!vanity_role_system_role) return;
  if (!vanity_role_system_channel) return;

  if (newPresence.activities.length === 0 && newPresence.member.roles.cache.has(vanity_role_system_role_id)) {
    if (!newPresence.member.roles.cache.has(vanity_role_system_role_id)) return;
    await newPresence.member.roles.remove(vanity_role_system_role);
    return vanity_role_system_channel.send({ content: `<@${newPresence.member.id}>'s vanity role was removed <t:${Math.round(Date.now() / 1000)}:R> because they removed **${vanity_role_system_status_text}** from their status.` });
  }

  if (newPresence.member.presence.status === "offline" || (newPresence.member.presence.status === "invisible" && newPresence.member.roles.cache.has(vanity_role_system_role_id))) {
    if (!newPresence.member.roles.cache.has(vanity_role_system_role_id)) return;
    await newPresence.member.roles.remove(vanity_role_system_role);
    return vanity_role_system_channel.send({ content: `<@${newPresence.member.id}>'s vanity role was removed <t:${Math.round(Date.now() / 1000)}:R> because they removed **${vanity_role_system_status_text}** from their status.` });
  }

  if (!newPresence.member.presence.activities[0]) return;
  if (newPresence.member.presence.activities[0].state === "") return;
  if (newPresence.member.presence.activities[0].state === null && newPresence.member.roles.cache.has(vanity_role_system_role_id)) {
    if (!newPresence.member.roles.cache.has(vanity_role_system_role_id)) return;
    await newPresence.member.roles.remove(vanity_role_system_role);
    return vanity_role_system_channel.send({ content: `<@${newPresence.member.id}>'s vanity role was removed <t:${Math.round(Date.now() / 1000)}:R> because they removed **${vanity_role_system_status_text}** from their status.` });
  }

  if (newPresence.activities.some((activity) => activity.type === 4 && ((activity.state && activity.state === vanity_role_system_status_text))) && !newPresence.member.roles.cache.has(vanity_role_system_role_id)) {
    if (newPresence.member.roles.cache.has(vanity_role_system_role_id)) return;
    await newPresence.member.roles.add(vanity_role_system_role)
    return vanity_role_system_channel.send({ content: `<@${newPresence.member.id}>'s vanity role was added <t:${Math.round(Date.now() / 1000)}:R> because they added **${vanity_role_system_status_text}** to their status.` });
  } else if (!newPresence.activities.some((activity) => activity.type === 4 && ((activity.state && activity.state === vanity_role_system_status_text))) && newPresence.member.roles.cache.has(vanity_role_system_role_id)) {
    if (newPresence.status === "offline" || newPresence.status === "invisible") {
    await newPresence.member.roles.remove(vanity_role_system_role);
    return vanity_role_system_channel.send({ content: `<@${newPresence.member.id}>'s vanity role was removed <t:${Math.round(Date.now() / 1000)}:R> because they removed **${vanity_role_system_status_text}** from their status.` });
    }

  if (!newPresence.activities.some((activity) => activity.type === 4 && ((activity.state && activity.state === vanity_role_system_status_text)))) {
    await newPresence.member.roles.remove(vanity_role_system_role);
    return vanity_role_system_channel.send({ content: `<@${newPresence.member.id}>'s vanity role was removed <t:${Math.round(Date.now() / 1000)}:R> because they removed **${vanity_role_system_status_text}** from their status.` });
    }
  }
}
}
);

client.login(config.Client.bot_token);