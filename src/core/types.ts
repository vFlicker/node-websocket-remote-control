export enum ActionType {
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

export type Payload = number[]

export type Actions = {
  type: ActionType
  payload: Payload
}
