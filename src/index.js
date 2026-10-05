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

// the 20 classic Magic 8 Ball answers: 10 positive, 5 vague, 5 negative
const ANSWERS = [
  'It is certain.',
  'It is decidedly so.',
  'Without a doubt.',
  'Yes definitely.',
  'You may rely on it.',
  'As I see it, yes.',
  'Most likely.',
  'Outlook good.',
  'Yes.',
  'Signs point to yes.',
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  'Cannot predict now.',
  'Concentrate and ask again.',
  "Don't count on it.",
  'My reply is no.',
  'My sources say no.',
  'Outlook not so good.',
  'Very doubtful.',
];
const pickAnswer = () => ANSWERS[Math.floor(Math.random() * ANSWERS.length)];

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
