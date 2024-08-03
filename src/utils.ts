const enum Colors {
  Red = 31,
  Green = 32,
  Blue = 34,
}

export const enum PrintFlag {
  Success = 'success',
  Info = 'info',
  Error = 'error',
}

const getColoredText = (text: string, color: Colors) => {
  return `\x1B[${color}m${text}\x1B[0m`;
};

export const print = (text: string, flag?: PrintFlag) => {
  switch (flag) {
    case PrintFlag.Success:
      console.log(getColoredText(text, Colors.Green));
      break;
    case PrintFlag.Info:
      console.log(getColoredText(text, Colors.Blue));
      break;
    case PrintFlag.Error:
      console.log(getColoredText(text, Colors.Red));
      break;
    default:
      console.log(text);
      break;
  }
};
