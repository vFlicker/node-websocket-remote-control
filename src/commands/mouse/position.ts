import robot from 'robotjs'

export const position = () => {
  const mousePos = robot.getMousePos()
  return `mouse_position ${mousePos.x},${mousePos.y}`
}
