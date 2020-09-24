import { createConnection, Connection } from 'typeorm';
import { Guild } from '../entities/guild';
import { Queue } from '../entities/queue';

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

export { connection };
