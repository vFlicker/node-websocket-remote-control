import robot from 'robotjs';

export const circle = (radius: number): void => {
  const mousePos = robot.getMousePos();

  robot.moveMouse(mousePos.x + radius, mousePos.y);
  robot.mouseToggle('down');
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const x = mousePos.x + radius * Math.cos(i);
    const y = mousePos.y + radius * Math.sin(i);
    robot.dragMouse(x, y);
  }
  robot.mouseToggle('up');
};
