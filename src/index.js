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

// the actual question, case insensitive, allows "is this true?" "is this true???" etc
const QUESTION_RE = /\bis\s+(this|that|it)\s+true\b/i;

client.once(Events.ClientReady, (c) => {
  console.log(`logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const pinged = message.mentions.has(client.user, {
    ignoreEveryone: true,
    ignoreRoles: true,
  });
  if (!pinged) return;

  // strip the mention(s) so only the text around the ping gets checked
  const text = message.content.replace(/<@!?\d+>/g, '');
  if (!QUESTION_RE.test(text)) return;

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
