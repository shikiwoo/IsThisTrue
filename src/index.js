require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    // privileged intent, must be enabled in the dev portal too
    GatewayIntentBits.MessageContent,
  ],
});

const ANSWERS = ['yea', 'no lol'];
const pickAnswer = () => ANSWERS[Math.floor(Math.random() * ANSWERS.length)];

// matches plain text "@grok" (case insensitive) since there's no real user by that name
const GROK_RE = /@grok\b/i;

client.once(Events.ClientReady, (c) => {
  console.log(`logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const pinged = message.mentions.has(client.user, {
    ignoreEveryone: true,
    ignoreRoles: true,
  });
  const saidGrok = GROK_RE.test(message.content);

  if (!pinged && !saidGrok) return;

  try {
    // reply (not just send) so it's clear which message we're answering
    // this also works great when someone replies to a claim and pings the bot
    await message.reply({
      content: pickAnswer(),
      allowedMentions: { repliedUser: false },
    });
  } catch (err) {
    console.error('failed to reply:', err);
  }
});

client.login(process.env.DISCORD_TOKEN);
