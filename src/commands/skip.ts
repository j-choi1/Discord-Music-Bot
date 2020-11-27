import { Message } from 'discord.js';
import { guilds } from '../connections/database';
import {
  isInSameVoiceAsMember,
  sendErrorMessage,
  isBotInVoice
} from '../utils/common';
import { playNext } from './play';

const skip = async (message: Message) => {
  if (!isBotInVoice(message)) {
    return;
  }

  if (!isInSameVoiceAsMember(message)) {
    return sendErrorMessage(
      message,
      'You must be in the same channel as the bot.'
    );
  }

  if (guilds[message.guild!.id].loop) {
    guilds[message.guild!.id].loop = false;
    await playNext(message);
    guilds[message.guild!.id].loop = true;
  } else {
    await playNext(message);
  }
};

export default skip;
