import { Message } from 'discord.js';
import { guilds } from '../connections/database';
import {
  sendErrorMessage,
  isBotPlaying,
  sendInfoMessage
} from '../utils/common';

const current = async (message: Message) => {
  if (!isBotPlaying(message) || !guilds[message.guild!.id].current) {
    return sendErrorMessage(
      message,
      'The bot is currently not playing any music.'
    );
  }

  sendInfoMessage(message, `**${guilds[message.guild!.id].current!.title!}**`);
};

export default current;
