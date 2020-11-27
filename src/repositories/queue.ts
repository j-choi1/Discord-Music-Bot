import _ from 'lodash';
import { Guild } from 'discord.js';
import { EntityRepository, Repository } from 'typeorm';
import { Queue } from '../entities/queue';

@EntityRepository(Queue)
export class QueueRepository extends Repository<Queue> {
  async add(guild: Guild, youtubeId: string, title: string, duration: string) {
    const queue = await this.findOne({
      where: { guild },
      order: { position: 'DESC' }
    });

    if (queue) {
      await this.insert({
        youtubeId,
        guild,
        title,
        duration,
        position: queue.position + 1
      });
    } else {
      await this.insert({ youtubeId, guild, title, duration, position: 1 });
    }
  }

  async shuffle(guild: Guild) {
    let queues = await this.find({ where: { guild } });
    let count = queues.length;

    queues = _.shuffle(queues);

    for (const queue of queues) {
      await this.update(queue, { position: count-- });
    }
  }
}
