import robot from 'robotjs';

import * as mouse from '../mouse';

export const rectangle = (
  type: string,
  width: number,
  height: number,
): string => {
  robot.mouseToggle('down');
  mouse.right(type, width);
  mouse.down(type, height);
  mouse.left(type, width);
  mouse.up(type, height);
  robot.mouseToggle('up');

  return `${type} executed successfully`;
};
