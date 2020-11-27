import { Message } from 'discord.js';

import {
  isBotPlaying,
  numArguments,
  sendErrorMessage,
  sendInfoMessage
} from '../utils/common';
import { connection, dispatchers } from '../connections/database';
import { Queue } from '../entities/queue';

import add from './add';
import join from './join';
import skip from './skip';

const play = async (message: Message) => {
  if (numArguments(message) === 0) {
    if (isBotPlaying(message)) {
      sendErrorMessage(message, 'The bot is already playing music.');
      return false;
    }

    const count = await connection.manager.count(Queue, {
      where: { guild: message.guild }
    });

    if (count <= 0) {
      sendErrorMessage(message, 'There are no songs in the queue.');
      return false;
    }
  } else {
    if (!(await add(message))) {
      return false;
    }
  }

  if (!isBotPlaying(message)) {
    if (!(await join(message))) {
      return false;
    }

    await skip(message);
  }

  return true;
};

export default play;
