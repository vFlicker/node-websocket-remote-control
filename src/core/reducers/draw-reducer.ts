import { draw } from '../events'
import { Actions, ActionType } from '../types'

export const drawReducer = (action: Actions) => {
  switch (action.type) {
    case ActionType.DrawRectangle:
      draw.rectangle(action.payload)
      break
    case ActionType.DrawSquare:
      draw.square(action.payload)
      break
    case ActionType.DrawCircle:
      draw.circle(action.payload)
      break
    default:
      break
  }
}
