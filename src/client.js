import mongoose from 'mongoose';
import { getAlerts, setAlertChannelCommand } from './alert.js';

export const initializeClient = (client, mongodbURI) => {
  mongoose.connect(mongodbURI, {});

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'setalertchannel') {
      setAlertChannelCommand(interaction);
    }
  });

  client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    getAlerts(client);
  });
};
