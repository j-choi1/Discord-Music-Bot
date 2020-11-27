import { Message } from 'discord.js';
import { isMemberInVoice, sendErrorMessage } from '../utils/common';

const join = async (message: Message) => {
  if (!isMemberInVoice(message)) {
    sendErrorMessage(message, 'You must be in a voice channel.');
    return false;
  }

  if (!message.member!.voice.channel!.joinable) {
    sendErrorMessage(
      message,
      'Insufficient permission to join the voice channel.'
    );
    return false;
  }

  await message.member!.voice.channel!.join();
  
  return true;
};

export default join;
