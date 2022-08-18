import robot from 'robotjs';

export const down = (type: string, shiftY: number): string => {
  const mousePos = robot.getMousePos();
  const mouseShiftPosX = mousePos.x;
  const mouseShiftPosY = mousePos.y + shiftY;

  robot.moveMouseSmooth(mouseShiftPosX, mouseShiftPosY);
  return `${type} executed successfully`;
};
