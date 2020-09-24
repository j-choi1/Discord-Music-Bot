import Discord from 'discord.js';
import logger from '../utils/logger';
import { connection } from './database';
import { GuildRepository } from '../repositories/guild';
import { Guild } from '../entities/guild';

const client = new Discord.Client();
client.login(process.env.DISCORD_TOKEN);

client.on('ready', async () => {
  logger.info(
    `Discord client initialized and logged in as ${client.user?.tag}.`
  );

  await connection.getCustomRepository(GuildRepository).addMissingGuildsToDB();
});

client.on('guildCreate', async (guild) => {
  await connection.manager.insert(Guild, { id: guild.id });

  logger.info(`Added a new Discord guild: ${guild.id}`);
});

export default client;
