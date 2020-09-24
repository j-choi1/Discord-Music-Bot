import { Message } from 'discord.js';

const stop = async (message: Message) => {
  message.member!.voice.channel?.leave();
};

export default stop;
