import Discord from 'discord.js';
import logger from '../utils/logger';
import { connection } from './database';
import { GuildRepository } from '../repositories/guild';

const client = new Discord.Client();
client.login(process.env.DISCORD_TOKEN);

client.on('ready', async () => {
  logger.info(
    `Discord client initialized and logged in as ${client.user?.tag}.`
  );

  await connection.getCustomRepository(GuildRepository).addMissingGuildsToDB();
});

export default client;
