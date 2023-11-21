import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';

config();

const commands = [
    {
        name: 'set',
        description: 'Set current channel as the alert channel, alerts will be sent to this channel.',
    },
];
  
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  
  (async () => {
    try {
      console.log('Registering slash commands...');
  
      await rest.put(
        Routes.applicationGuildCommands(
          process.env.APP_ID,
          1172110172517318678,
        ),
        { body: commands }
      );
  
      console.log('Slash commands were registered successfully!');
    } catch (error) {
      console.log(`There was an error: ${error}`);
    }
  })();