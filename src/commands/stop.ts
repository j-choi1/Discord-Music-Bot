import { Message } from 'discord.js';
import { dispatchers } from '../connections/database';
import {
  isInSameVoiceAsMember,
  sendErrorMessage,
  isBotInVoice
} from '../utils/common';

const stop = (message: Message) => {
  if (isBotInVoice(message)) {
    return false;
  }

  console.log('aa');
  if (!isInSameVoiceAsMember(message)) {
    sendErrorMessage(message, 'You must be in the same channel as the bot.');
    return false;
  }

  const dispatcher = dispatchers[message.guild!.id];

  if (dispatcher) {
    dispatcher.destroy();
    delete dispatchers[message.guild!.id];
  }

  message.member!.voice.channel?.leave();

  return true;
};

export default stop;
