import * as draw from './draw';
import * as mouse from './mouse';
import * as screen from './screen';

export const commands = {
  draw_circle: draw.circle,
  draw_rectangle: draw.rectangle,
  draw_square: draw.square,

  mouse_down: mouse.down,
  mouse_left: mouse.left,
  mouse_position: mouse.position,
  mouse_right: mouse.right,
  mouse_up: mouse.up,

  prnt_scrn: screen.screenshot,
};
