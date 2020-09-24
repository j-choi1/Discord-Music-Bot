import { Message } from 'discord.js';
import { Queue } from '../entities/queue';
import { Guild } from '../entities/guild';
import { connection } from '../connections/database';

const play = async (message: Message) => {
  let guild = await connection.manager.findOne(Guild, 1);

  if (guild !== null) {
    guild = new Guild();
    guild.id = message.guild!.id;

    await connection.manager.save(guild);
  }

  const queue = new Queue();
  queue.youtubeId = 'hehhe';
  queue.guild = guild;
  await connection.manager.save(queue);

  const guildFinds = await connection.manager.findOne(Guild, {
    where: { id: '746222614078554163' }
  });

  // const queueFinds = await connection.manager.find(Queue, {
  //   where: { guildID: '746222614078554163' }
  // });

  console.log(guildFinds);
  // console.log(queueFinds);
};

export default play;
