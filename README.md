# IsThisTrue

Legally distinct Discord bot. Ping it (like `@grok is this true`, or really any ping) and it answers using the most reliable method known to man - gambling. zero fact checking.

## Setup

1. Make an app at https://discord.com/developers/applications and add a bot
2. In the Bot tab turn on **Message Content Intent**
3. Invite it with the `bot` scope and permissions: View Channels, Send Messages, Read Message History
4. `cp .env.example .env` and paste your token
5. `npm install && npm start`

## How it works

It listens to every message and replies to any message that @mentions the bot, whatever the text says. No ping, no answer. @everyone and role pings don't count.

## Run it as a systemd service

The unit file lives in `deploy/is-this-true.service`. It assumes the project is at `/opt/is-this-true` and runs as a user called `istt`, so edit those lines if yours differ. Commands below work in Fish:

```fish
sudo useradd --system --no-create-home istt
sudo cp -r . /opt/is-this-true
cd /opt/is-this-true
sudo npm install --omit=dev
sudo cp .env.example .env
sudo nano .env    # paste your token
sudo chown -R istt:istt /opt/is-this-true
sudo chmod 600 .env

sudo cp deploy/is-this-true.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now is-this-true
```

Check on it with `systemctl status is-this-true` and `journalctl -u is-this-true -f`.
