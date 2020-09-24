import { Message } from 'discord.js';
import add from './add';
import join from './join';

const play = async (message: Message) => {
  join(message);
  add(message);

  
};

export default play;
