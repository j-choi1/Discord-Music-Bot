import { Message } from 'discord.js';

export const requireUserInVoice = (message: Message) => {
  if (message.member!.voice.channel) {
    return true;
  } else {
    message.reply('You must be in a voice channel.');
    return false;
  }
};

export const numArguments = (message: string) => {
  return message.trim().split(' ').length - 1;
};

export const sendErrorMessage = (message: Message, description: string) => {
  message.channel.send({
    embed: {
      title: ':regional_indicator_x: Status: Error',
      description
    }
  });
};

export const sendSuccessMessage = (message: Message, description: string) => {
  message.channel.send({
    embed: {
      title: ':white_check_mark: Status: Success',
      description
    }
  });
};

export const sendInfoMessage = (message: Message, description: string) => {
  message.channel.send({
    embed: {
      title: ':information_source: Status: Info',
      description
    }
  });
};
