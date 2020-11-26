import { Message } from 'discord.js';
import { dispatchers } from '../connections/database';
import {
  isInSameVoiceAsMember,
  isBotInVoice,
  sendErrorMessage
} from '../utils/common';

const resume = (message: Message) => {
  if (!isBotInVoice(message)) {
    return false;
  }

  if (!isInSameVoiceAsMember(message)) {
    sendErrorMessage(message, 'You must be in the same channel as the bot.');
    return false;
  }

  const dispatcher = dispatchers[message.guild!.id];

  if (dispatcher) {
    dispatchers[message.guild!.id].resume();
    console.log('resuming');
  }

  return true;
};

export default resume;
