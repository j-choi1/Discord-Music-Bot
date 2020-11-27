import { Message } from 'discord.js';
import { connection } from '../connections/database';
import { QueueRepository } from '../repositories/queue';
import { sendSuccessMessage } from '../utils/common';

const shuffle = async (message: Message) => {
  await connection.getCustomRepository(QueueRepository).shuffle(message.guild!);

  sendSuccessMessage(message, 'Queue has been shuffled.');
};

export default shuffle;
