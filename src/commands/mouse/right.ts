import robot from 'robotjs';

export const right = (type: string, shiftX: number): string => {
  const mousePos = robot.getMousePos();
  const mouseShiftPosX = mousePos.x + shiftX;
  const mouseShiftPosY = mousePos.y;

  robot.moveMouseSmooth(mouseShiftPosX, mouseShiftPosY);
  return `${type} executed successfully`;
};
