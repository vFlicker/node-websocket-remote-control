import { Payload } from '../../types'
import { drawRectangle } from './draw-rectangle'

export const drawSquare = ([width]: Payload) => {
  drawRectangle([width, width])
}
