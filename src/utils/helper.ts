import { Message } from 'discord.js';

export const requireUserInVoice = (message: Message) => {
  if (message.member!.voice.channel) {
    return true;
  } else {
    message.reply('You must be in a voice channel.');
    return false;
  }
};
