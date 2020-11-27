import { Message } from 'discord.js';
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

  await playNext(message);
};

export default skip;
