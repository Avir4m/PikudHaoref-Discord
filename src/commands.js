import { REST, Routes } from 'discord.js';

const commands = [
  {
    name: 'setalertchannel',
    description: 'Set the current channel as the alerts channel for the server.',
  },
];

const rest = new REST({ version: '9' });

export const initializeCommands = async (token, clientId) => {
  try {
    rest.setToken(token);

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );
  } catch (error) {
    console.error(error);
  }
};
