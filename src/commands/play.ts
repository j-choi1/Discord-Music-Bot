import { Message } from 'discord.js';
import ytdl from 'ytdl-core';

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

const playNext = async (message: Message) => {
  const queue = await connection.manager.findOne(Queue, {
    where: { guild: message.guild }
  });

  if (!queue) {
    sendInfoMessage(
      message,
      'There are no more songs in the queue. Disconnecting from voice channel.',
      false
    );

    delete dispatchers[message.guild!.id];
    message.member!.voice.channel?.leave();

    return false;
  }

  await connection.manager.delete(Queue, queue);

  const dispatcher = message.guild!.voice!.connection!.play(
    ytdl(queue!.youtubeId, {
      filter: 'audioonly'
    })
  );

  dispatcher.on('finish', () => playNext(message));
  dispatchers[message.guild!.id] = dispatcher;
};

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

    await playNext(message);
  }

  return true;
};

export default play;
