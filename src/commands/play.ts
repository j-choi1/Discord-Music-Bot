import { Message } from 'discord.js';
import ytdl from 'ytdl-core';

import { numArguments, sendErrorMessage } from '../utils/common';
import { connection, dispatchers } from '../connections/database';
import { Queue } from '../entities/queue';

import add from './add';
import join from './join';

const play = async (message: Message) => {
  if (await join(message)) {
    if (numArguments(message) > 0) {
      if (!(await add(message))) {
        return false;
      }
    }

    const queueRes = await connection.manager.findOne(Queue, {
      where: { guild: message.guild }
    });

    if (!queueRes) {
      sendErrorMessage(message, 'There are no songs in the queue.');
      return false;
    }

    const stream = ytdl(queueRes.youtubeId, {
      filter: 'audioonly'
    });

    dispatchers[message.guild!.id] = message.guild!.voice!.connection!.play(
      stream
    );
  }
};

export default play;
