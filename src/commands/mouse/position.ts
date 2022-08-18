import robot from 'robotjs';

export const position = (type: string): string => {
  const mousePos = robot.getMousePos();
  return `${type} ${mousePos.x},${mousePos.y}`;
};
