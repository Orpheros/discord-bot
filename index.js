const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const responses = require("./responses.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  if (responses[content]) {
    message.reply(responses[content]);
  }
});

client.login(process.env.DISCORD_TOKEN);
