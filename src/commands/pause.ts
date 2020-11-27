import { Message } from 'discord.js';
import { guilds } from '../connections/database';
import {
  isInSameVoiceAsMember,
  sendErrorMessage,
  isBotPlaying
} from '../utils/common';

const pause = (message: Message) => {
  if (!isBotPlaying(message)) {
    return;
  }

  if (!isInSameVoiceAsMember(message)) {
    return sendErrorMessage(
      message,
      'You must be in the same channel as the bot.'
    );
  }

  const dispatcher = guilds[message.guild!.id].dispatcher;

  if (dispatcher) {
    dispatcher.pause();
  }
};

export default pause;
