import { drawCircleCommand } from './draw/draw-circle-command';
import { drawRectangleCommand } from './draw/draw-rectangle-command';
import { drawSquareCommand } from './draw/draw-square-command';
import { mouseDownCommand } from './mouse/mouse-down-command';
import { mouseLeftCommand } from './mouse/move-left-command';
import { positionCommand } from './mouse/position-command';
import { mouseRightCommand } from './mouse/mouse-right-command';
import { mouseUpCommand } from './mouse/mouse-up-command';
import { screenshotCommand } from './screen/screenshot-command';

export const commands = {
  [drawCircleCommand.name]: drawCircleCommand,
  [drawRectangleCommand.name]: drawRectangleCommand,
  [drawSquareCommand.name]: drawSquareCommand,
  [mouseDownCommand.name]: mouseDownCommand,
  [mouseLeftCommand.name]: mouseLeftCommand,
  [positionCommand.name]: positionCommand,
  [mouseRightCommand.name]: mouseRightCommand,
  [mouseUpCommand.name]: mouseUpCommand,
  [screenshotCommand.name]: screenshotCommand,
};
