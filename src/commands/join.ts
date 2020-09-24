import { Message } from 'discord.js';
import { requireUserInVoice } from '../utils/helper';

const join = async (message: Message) => {
  if (requireUserInVoice(message)) {
    if (!message.member!.voice.channel?.joinable) {
      return message.reply(
        'I do not have permission to join the voice channel.'
      );
    }

    message.member!.voice.channel.join();
  }
};

export default join;
