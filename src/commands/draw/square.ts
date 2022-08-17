import { Payload } from '../../types';
import { rectangle } from './rectangle';

export const square = ([width]: Payload) => {
  rectangle([width, width]);
};
