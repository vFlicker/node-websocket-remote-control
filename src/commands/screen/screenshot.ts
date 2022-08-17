import robot from 'robotjs';

import { base64Image, calculateMousePosition } from './utils';

const WIDTH = 200;
const HEIGHT = 200;
const DUPLICATE_LINE = 'data:image/png;base64,';

export const screenshot = async (): Promise<string> => {
  const { x, y } = calculateMousePosition(WIDTH, HEIGHT);
  const bitmap = robot.screen.capture(x, y, WIDTH, HEIGHT);
  const base64 = await base64Image(bitmap.image, WIDTH, HEIGHT);
  return `prnt_scrn ${base64.replace(DUPLICATE_LINE, '')}`;
};
