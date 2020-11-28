# Discord-Music-Bot

Fully functional Discord music bot.

- TypeScript
- SQLite
- TypeORM
- [Discord.js](https://discord.js.org/)
- [ytdl-core](https://www.npmjs.com/package/ytdl-core)

## Required Configurations

1. Rename _.env.example_ to _.env_

2. Inside the _.env_ file, set _DISCORD_TOKEN_ to your Discord bot token.

## How To Run

**Development**
```
npm run start:dev
```

**Production**
```
npm run build
npm run start
```

## Commands

```
;play <Youtube URL> - Adds song to the queue.
;play - Starts the music.
;add <Youtube URL> - Adds song to the queue.
;np - Gets the current playing song name.
;queue - Lists the queue.
;clear - Clears the queue.
;loop - Enable/disable loop.
;skip - Skips the current song.
;stop - Stops the music bot.
;pause - Pauses the music bot.
;resume - Resumes the music bot.
;shuffle - Shuffles the queue.
;join - Music bot joins the voice channel.
;leave - Music bot leaves the voice channel.
```
