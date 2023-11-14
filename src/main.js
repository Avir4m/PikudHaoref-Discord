import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds]});
const TOKEN = process.env.TOKEN;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(TOKEN);
