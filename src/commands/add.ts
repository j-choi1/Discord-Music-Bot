import { Message } from 'discord.js';
import ytdl from 'ytdl-core';
import {
  numArguments,
  sendErrorMessage,
  sendSuccessMessage
} from '../utils/helper';
import { Queue } from '../entities/queue';
import { connection } from '../connections/database';

const add = async (message: Message) => {
  if (numArguments(message.content) !== 1) {
    return sendErrorMessage(
      message,
      `Invalid command syntax.\n\n**Correct Syntax:**\n${process.env
        .PREFIX!}add <Youtube URL>`
    );
  }

  const youtubeURL = message.content.trim().split(' ')[1];

  if (!ytdl.validateURL(youtubeURL)) {
    return sendErrorMessage(
      message,
      'You have entered an invalid Youtube link.'
    );
  }

  const youtubeInfo = await ytdl.getInfo(youtubeURL);

  await connection.manager.insert(Queue, {
    guild: message.guild!,
    youtubeId: youtubeInfo.videoDetails.videoId
  });

  sendSuccessMessage(
    message,
    `**${youtubeInfo.videoDetails.title}** has been added to the queue.`
  );
};

export default add;
