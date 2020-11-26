import { Message } from 'discord.js';
import { dispatchers } from '../connections/database';
import {
  isInSameVoiceAsMember,
  sendErrorMessage,
  isBotInVoice
} from '../utils/common';

const stop = (message: Message) => {
  if (!isBotInVoice(message)) {
    return false;
  }

  if (!isInSameVoiceAsMember(message)) {
    sendErrorMessage(message, 'You must be in the same channel as the bot.');
    return false;
  }

  delete dispatchers[message.guild!.id];

  message.member!.voice.channel?.leave();

  return true;
};

export default stop;
