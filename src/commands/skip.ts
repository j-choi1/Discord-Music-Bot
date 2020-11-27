import { Message } from 'discord.js';
import ytdl from 'ytdl-core';
import { connection, dispatchers } from '../connections/database';
import { Queue } from '../entities/queue';
import {
  isInSameVoiceAsMember,
  sendErrorMessage,
  isBotInVoice,
  sendInfoMessage
} from '../utils/common';

const skip = async (message: Message) => {
  if (!isBotInVoice(message)) {
    return false;
  }

  if (!isInSameVoiceAsMember(message)) {
    sendErrorMessage(message, 'You must be in the same channel as the bot.');
    return false;
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

  dispatcher.on('finish', () => skip(message));
  dispatchers[message.guild!.id] = dispatcher;
};

export default skip;
