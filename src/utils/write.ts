const enum Colors {
  Red = 31,
  Green = 32,
  Blue = 34,
}

const getColoredText = (text: string, color: Colors) => {
  return `\x1B[${color}m${text}\x1B[0m`;
};

export const enum WriteFlag {
  Success = 'success',
  Info = 'info',
  Error = 'error',
}

export const write = (text: string, flag?: WriteFlag) => {
  switch (flag) {
    case WriteFlag.Success:
      console.log(getColoredText(text, Colors.Green));
      break;
    case WriteFlag.Info:
      console.log(getColoredText(text, Colors.Blue));
      break;
    case WriteFlag.Error:
      console.log(getColoredText(text, Colors.Red));
      break;
    default:
      console.log(text);
      break;
  }
};
