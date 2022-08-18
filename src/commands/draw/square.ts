import { rectangle } from './rectangle';

export const square = (type: string, width: number): string => {
  rectangle(type, width, width);
  return `${type} executed successfully`;
};
