import * as dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import client from './connections/discord';
import { Message } from 'discord.js';
import { getCommand, loadGuildIfNotExists } from './utils/common';

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
import loop from './commands/loop';

client.on('message', async (message: Message) => {
  if (message.content.startsWith(process.env.PREFIX!)) {
    loadGuildIfNotExists(message);

    switch (getCommand(message)) {
      case 'play':
        await play(message);
        break;
      case 'join':
        await join(message);
        break;
      case 'stop':
      case 'leave':
        await stop(message);
        break;
      case 'add':
        await add(message);
        break;
      case 'pause':
        await pause(message);
        break;
      case 'resume':
        await resume(message);
        break;
      case 'clear':
        await clear(message);
        break;
      case 'shuffle':
        await shuffle(message);
        break;
      case 'queue':
      case 'songs':
      case 'list':
        await queue(message);
        break;
      case 'skip':
      case 'next':
        await skip(message);
        break;
      case 'current':
      case 'nowplaying':
      case 'song':
      case 'np':
        await current(message);
        break;
      case 'loop':
        await loop(message);
        break;
    }
  }
});
