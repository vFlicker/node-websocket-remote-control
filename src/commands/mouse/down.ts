import robot from 'robotjs';

export const down = (shiftY: number): void => {
  const mousePos = robot.getMousePos();
  const mouseShiftPosX = mousePos.x;
  const mouseShiftPosY = mousePos.y + shiftY;
  robot.moveMouseSmooth(mouseShiftPosX, mouseShiftPosY);
};
