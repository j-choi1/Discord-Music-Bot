import { Message } from 'discord.js';
import { guilds } from '../connections/database';
import {
  isInSameVoiceAsMember,
  sendErrorMessage,
  isBotInVoice,
  endBroadcast
} from '../utils/common';

const stop = (message: Message) => {
  if (!isBotInVoice(message)) {
    return;
  }

  if (!isInSameVoiceAsMember(message)) {
    return sendErrorMessage(
      message,
      'You must be in the same channel as the bot.'
    );
  }

  endBroadcast(message);
  message.member!.voice.channel?.leave();
};

export default stop;
