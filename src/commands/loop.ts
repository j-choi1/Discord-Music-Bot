import { Message } from 'discord.js';
import { guilds } from '../connections/database';
import { sendInfoMessage } from '../utils/common';

const loop = async (message: Message) => {
  guilds[message.guild!.id].loop = !guilds[message.guild!.id].loop;

  sendInfoMessage(
    message,
    `Loop has been **${
      guilds[message.guild!.id].loop ? 'enabled' : 'disabled'
    }**.`
  );
};

export default loop;
