import { ActionType, Actions } from '../types';

export const parseMessage = (data: string): Actions => {
  const [command, ...coords] = data.split(' ');

  return {
    type: command as ActionType,
    payload: coords.map(Number),
  };
};
