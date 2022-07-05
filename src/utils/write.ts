type flag = 'success' | 'info' | 'error'

const enum Colors {
  RED = 31,
  GREEN = 32,
  BLUE = 34,
}

const getColoredText = (text: string, color: Colors) => {
  return `\x1B[${color}m${text}\x1B[0m`
}

export const write = (text: string, flag?: flag) => {
  switch (flag) {
    case 'success':
      console.log(getColoredText(text, Colors.GREEN))
      break
    case 'info':
      console.log(getColoredText(text, Colors.BLUE))
      break
    case 'error':
      console.log(getColoredText(text, Colors.RED))
      break
    default:
      console.log(text)
      break
  }
}
