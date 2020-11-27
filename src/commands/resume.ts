import { Message } from 'discord.js';
import { dispatchers } from '../connections/database';
import {
  isInSameVoiceAsMember,
  sendErrorMessage,
  isBotPlaying
} from '../utils/common';

const resume = (message: Message) => {
  if (!isBotPlaying(message)) {
    return false;
  }

  if (!isInSameVoiceAsMember(message)) {
    sendErrorMessage(message, 'You must be in the same channel as the bot.');
    return false;
  }

  const dispatcher = dispatchers[message.guild!.id];

  if (dispatcher) {
    dispatcher.resume();
  }

  return true;
};

export default resume;
