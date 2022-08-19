import { Duplex } from 'stream';

import { commands } from '../../commands';
import { parseMessage, write, WriteFlag } from '../../utils';

export const onDuplexData = (duplex: Duplex) => async (chunk: any) => {
  const { type, payload } = parseMessage(chunk.toString());
  const command = commands[type];

  if (!command) {
    const answer = `Unknown action: ${type}`;
    write(answer, WriteFlag.Error);
    duplex.write(`${answer}\0`);
    return;
  }

  const messagePayload = payload.length ? `with payload ${payload}` : '';
  write(`Request: command ${type} ${messagePayload}`, WriteFlag.Info);

  try {
    const result = await command(type, ...payload);

    write(`Response: command ${result}`, WriteFlag.Success);
    duplex.write(`${result || type}\0`);
  } catch (err) {
    const answer = `Command ${type} failed with error`;

    write(answer, WriteFlag.Error);
    duplex.write(`${answer}\0`);
  }
};

export const onDuplexError = (duplex: Duplex) => () => {
  duplex.write('Something went wrong\0');
};
