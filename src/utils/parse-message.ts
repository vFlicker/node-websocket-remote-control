const enum ActionType {
  MousePosition = 'mouse_position',
  MouseUp = 'mouse_up',
  MouseLeft = 'mouse_left',
  MouseDown = 'mouse_down',
  MouseRight = 'mouse_right',
  DrawRectangle = 'draw_rectangle',
  DrawSquare = 'draw_square',
  DrawCircle = 'draw_circle',
  PrintScreen = 'prnt_scrn',
}

type Payload = [number, number];

type Actions = {
  type: ActionType;
  payload: Payload;
};

export const parseMessage = (data: string): Actions => {
  const [command, ...coords] = data.split(' ');

  return {
    type: command as ActionType,
    payload: coords.map(Number) as Payload,
  };
};
