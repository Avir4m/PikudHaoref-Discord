import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { getAlerts } from './alert.js';

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN = process.env.TOKEN;


client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  getAlerts(client);
});


client.login(TOKEN);