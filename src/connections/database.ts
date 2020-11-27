import { StreamDispatcher } from 'discord.js';
import { createConnection, Connection } from 'typeorm';
import { Guild } from '../entities/guild';
import { Queue } from '../entities/queue';

interface iGuilds {
  [key: string]: {
    loop?: boolean;
    dispatcher?: StreamDispatcher;
    current?: string;
  };
}

const guilds: iGuilds = {};
let connection!: Connection;

(async () => {
  if (!connection || !connection.isConnected) {
    connection = await createConnection({
      type: 'sqlite',
      database: process.env.SQLITE_FILENAME!,
      entities: [Guild, Queue]
    });

    await connection.synchronize();
  }
})();

export { guilds, connection };
