import * as dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { Message } from 'discord.js';
import client from './connections/discord';

import play from './commands/play';
import add from './commands/add';
import join from './commands/join';
import stop from './commands/stop';

client.on('message', (message: Message) => {
  if (message.content.startsWith(process.env.PREFIX!)) {
    const command = message.content.trim().substr(1).split(' ')[0];

    switch (command) {
      case 'play':
        play(message);
        break;
      case 'join':
        join(message);
        break;
      case 'stop':
      case 'leave':
        stop(message);
        break;
      case 'add':
        add(message);
        break;
    }
  }
});
