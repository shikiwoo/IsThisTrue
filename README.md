# IsThisTrue

Discord bot. Ping it (or type `@grok`) and it answers `yea` or `no lol`. Totally random, zero fact checking.

## Setup

1. Make an app at https://discord.com/developers/applications and add a bot
2. In the Bot tab turn on **Message Content Intent**
3. Invite it with the `bot` scope and permissions: View Channels, Send Messages, Read Message History
4. `cp .env.example .env` and paste your token
5. `npm install && npm start`

## How it works

It listens to every message and replies if the bot got @mentioned or the text contains `@grok`.
