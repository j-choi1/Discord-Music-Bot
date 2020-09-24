import { EntityRepository, Repository } from 'typeorm';
import { Guild } from '../entities/guild';
import client from '../connections/discord';

@EntityRepository(Guild)
export class GuildRepository extends Repository<Guild> {
  async addMissingGuildsToDB() {
    for (const [guildId] of client.guilds.cache) {
      if (!(await this.findOne(guildId))) {
        await this.save({ id: guildId });
      }
    }
  }
}
