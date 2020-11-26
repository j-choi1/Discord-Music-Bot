import { Message } from 'discord.js';
import ytdl from 'ytdl-core';
import {
  getCommand,
  numArguments,
  sendErrorMessage,
  sendSuccessMessage
} from '../utils/common';
import { Queue } from '../entities/queue';
import { connection } from '../connections/database';

const add = async (message: Message) => {
  if (numArguments(message) !== 1) {
    sendErrorMessage(
      message,
      `Invalid command syntax.\n\n**Correct Syntax:**\n${process.env
        .PREFIX!}${getCommand(message)} <Youtube URL>`
    );

    return false;
  }

  const youtubeURL = message.content.trim().split(' ')[1];

  if (!ytdl.validateURL(youtubeURL)) {
    sendErrorMessage(message, 'You have entered an invalid Youtube link.');
    return false;
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

  return true;
};

export default add;
