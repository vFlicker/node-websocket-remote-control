import robot from 'robotjs';

export const position = (): string => {
  const mousePos = robot.getMousePos();
  return `mouse_position ${mousePos.x},${mousePos.y}`;
};
