import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { initializeClient } from './client.js';
import { initializeCommands } from './commands.js';

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const MONGODB_URI = process.env.MONGODB_URI;

initializeCommands(TOKEN, CLIENT_ID);

initializeClient(client, MONGODB_URI);

client.login(TOKEN);
