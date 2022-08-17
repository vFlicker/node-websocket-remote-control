import robot from 'robotjs';

import * as mouse from '../mouse';

export const rectangle = (width: number, height: number): void => {
  robot.mouseToggle('down');
  mouse.right(width);
  mouse.down(height);
  mouse.left(width);
  mouse.up(height);
  robot.mouseToggle('up');
};
