import { Message } from 'discord.js';

export const numArguments = (message: Message) => {
  return message.content.trim().split(' ').length - 1;
};

export const getCommand = (message: Message) => {
  return message.content.trim().substr(1).split(' ')[0];
};

export const sendErrorMessage = (message: Message, description: string) => {
  message.channel.send({
    embed: {
      title: ':regional_indicator_x: Status: Error',
      description: `<@${message.member!.id}>\n\n${description}`
    }
  });
};

export const sendSuccessMessage = (message: Message, description: string) => {
  message.channel.send({
    embed: {
      title: ':white_check_mark: Status: Success',
      description: `<@${message.member!.id}>\n\n${description}`
    }
  });
};

export const sendInfoMessage = (message: Message, description: string) => {
  message.channel.send({
    embed: {
      title: ':information_source: Status: Info',
      description: `<@${message.member!.id}>\n\n${description}`
    }
  });
};

export const isMemberInVoice = (message: Message) => {
  return message.member!.voice.channel;
};

export const isBotInVoice = (message: Message) => {
  return message.member!.guild.voice?.channel;
};

export const isInSameVoiceAsMember = (message: Message) => {
  return (
    message.member!.voice.channel?.id ===
    message.member!.guild.voice?.channel?.id
  );
};
