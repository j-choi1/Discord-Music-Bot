import { Message } from 'discord.js';
import {
  endBroadcast,
  isBotPlaying,
  numArguments,
  sendErrorMessage,
  sendInfoMessage
} from '../utils/common';
import { connection, guilds } from '../connections/database';
import { Queue } from '../entities/queue';

import add from './add';
import join from './join';
import ytdl from 'ytdl-core';

const broadcast = (queue: Queue, message: Message) => {
  const dispatcher = message.guild!.voice!.connection!.play(
    ytdl(queue!.youtubeId, {
      filter: 'audioonly'
    })
  );

  dispatcher.on('finish', () => playNext(message));
  guilds[message.guild!.id].dispatcher = dispatcher;
  guilds[message.guild!.id].current = queue;
};

const playNext = async (message: Message) => {
  if (guilds[message.guild!.id].loop && guilds[message.guild!.id].current) {
    return broadcast(guilds[message.guild!.id].current!, message);
  }

  const queue = await connection.manager.findOne(Queue, {
    where: { guild: message.guild }
  });

  if (!queue) {
    sendInfoMessage(
      message,
      'There are no more songs in the queue. Disconnecting from voice channel.',
      false
    );

    endBroadcast(message);
    message.member!.voice.channel?.leave();

    return false;
  }

  broadcast(queue, message);

  await connection.manager.delete(Queue, queue);
};

const play = async (message: Message) => {
  if (numArguments(message) === 0) {
    if (isBotPlaying(message)) {
      return sendErrorMessage(message, 'The bot is already playing music.');
    }

    const count = await connection.manager.count(Queue, {
      where: { guild: message.guild }
    });

    if (count <= 0) {
      return sendErrorMessage(message, 'There are no songs in the queue.');
    }
  } else {
    if (!(await add(message))) {
      return;
    }
  }

  if (!isBotPlaying(message)) {
    if (!(await join(message))) {
      return;
    }

    await playNext(message);
  }
};

export default play;
export { playNext };
