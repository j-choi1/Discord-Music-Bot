import * as dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import client from './connections/discord';
import { Message } from 'discord.js';
import { getCommand } from './utils/common';

import play from './commands/play';
import add from './commands/add';
import join from './commands/join';
import stop from './commands/stop';
import pause from './commands/pause';
import resume from './commands/resume';
import clear from './commands/clear';
import shuffle from './commands/shuffle';
import queue from './commands/queue';
import skip from './commands/skip';
import current from './commands/current';

client.on('message', (message: Message) => {
  if (message.content.startsWith(process.env.PREFIX!)) {
    switch (getCommand(message)) {
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
      case 'pause':
        pause(message);
        break;
      case 'resume':
        resume(message);
        break;
      case 'clear':
        clear(message);
        break;
      case 'shuffle':
        shuffle(message);
        break;
      case 'queue':
      case 'songs':
      case 'list':
        queue(message);
        break;
      case 'skip':
      case 'next':
        skip(message);
        break;
      case 'current':
      case 'nowplaying':
      case 'song':
      case 'np':
        current(message);
        break;
    }
  }
});
