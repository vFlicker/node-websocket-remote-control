import robot from 'robotjs';

import { Payload } from '../../types';

export const up = ([shiftY]: Payload) => {
  const mousePos = robot.getMousePos();
  const mouseShiftPosX = mousePos.x;
  const mouseShiftPosY = mousePos.y - shiftY;
  robot.moveMouseSmooth(mouseShiftPosX, mouseShiftPosY);
};
