import { Action, Commands } from './types';

const parseMessage = (data: string): Action => {
  const [command, ...coords] = data.split(' ');

  return {
    type: command,
    payload: coords.map((coord) => parseInt(coord, 10)),
  };
};

export const handleMessage = async (
  message: string,
  commands: Commands,
): Promise<string> => {
  const { type, payload } = parseMessage(message);
  const command = commands[type];

  if (!command) {
    throw new Error(`Unknown action: ${type}`);
  }

  try {
    const result = await command.execute(...payload);
    return result || command.name;
  } catch (err) {
    console.error(`Error executing command: ${type}`, err);
    throw new Error(`Command ${command.name} failed with error`);
  }
};
