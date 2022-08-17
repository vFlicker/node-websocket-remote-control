import robot from 'robotjs';

export const right = (shiftX: number): void => {
  const mousePos = robot.getMousePos();
  const mouseShiftPosX = mousePos.x + shiftX;
  const mouseShiftPosY = mousePos.y;
  robot.moveMouseSmooth(mouseShiftPosX, mouseShiftPosY);
};
