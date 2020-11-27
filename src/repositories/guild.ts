import { EntityRepository, Repository } from 'typeorm';
import { Guild } from '../entities/guild';
import client from '../connections/discord';
import { guilds } from '../connections/database';

@EntityRepository(Guild)
export class GuildRepository extends Repository<Guild> {
  async addMissingGuildsToDB() {
    for (const [guildId] of client.guilds.cache) {
      guilds[guildId] = {};

      if (!(await this.findOne(guildId))) {
        await this.save({ id: guildId });
      }
    }
  }
}
