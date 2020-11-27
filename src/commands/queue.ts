import { Message } from 'discord.js';
import { connection } from '../connections/database';
import { Queue } from '../entities/queue';
import { sendInfoMessage } from '../utils/common';

const queue = async (message: Message) => {
  const queues = await connection.manager.find(Queue, {
    where: { guild: message.guild },
    order: { position: 'ASC' }
  });

  if (!queues.length) {
    return sendInfoMessage(message, 'There are no songs in the queue.');
  }

  let result = '';
  for (let i = 0; i < queues.length; i++) {
    const queue = queues[i];
    const duration = parseInt(queue.duration);

    const time = new Date(duration * 1000).toISOString().substr(11, 8);

    result += `${i + 1}. **${queue.title}** (${time})\n\n`;
  }

  sendInfoMessage(message, result);
};

export default queue;
