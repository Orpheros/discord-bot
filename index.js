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

  for (const [trigger, response] of Object.entries(responses)) {
    if (content.includes(trigger)) {
      message.reply(response);
      break;
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
