import { Message } from 'discord.js';
import { connection } from '../connections/database';
import { Queue } from '../entities/queue';
import { sendSuccessMessage } from '../utils/common';

const clear = async (message: Message) => {
  await connection.manager.delete(Queue, { guild: message.guild });

  sendSuccessMessage(message, 'Queue has been cleared.');
};

export default clear;
