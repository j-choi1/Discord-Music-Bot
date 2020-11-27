import { Message } from 'discord.js';
import ytdl from 'ytdl-core';
import {
  getCommand,
  isBotInVoice,
  isInSameVoiceAsMember,
  numArguments,
  sendErrorMessage,
  sendSuccessMessage
} from '../utils/common';
import { connection } from '../connections/database';
import { QueueRepository } from '../repositories/queue';

const add = async (message: Message) => {
  if (numArguments(message) !== 1) {
    sendErrorMessage(
      message,
      `Invalid command syntax.\n\n**Correct Syntax:**\n${process.env
        .PREFIX!}${getCommand(message)} <Youtube URL>`
    );

    return false;
  }

  if (isBotInVoice(message)) {
    if (!isInSameVoiceAsMember(message)) {
      sendErrorMessage(
        message,
        'You must be in the same voice channel as the bot.'
      );
      return false;
    }
  }

  const youtubeURL = message.content.trim().split(' ')[1];

  if (!ytdl.validateURL(youtubeURL)) {
    sendErrorMessage(message, 'You have entered an invalid Youtube link.');
    return false;
  }

  const youtubeInfo = await ytdl.getInfo(youtubeURL);

  await connection
    .getCustomRepository(QueueRepository)
    .add(
      message.guild!,
      youtubeInfo.videoDetails.videoId,
      youtubeInfo.videoDetails.title,
      youtubeInfo.videoDetails.lengthSeconds
    );

  sendSuccessMessage(
    message,
    `**${youtubeInfo.videoDetails.title}** has been added to the queue.`
  );

  return true;
};

export default add;
