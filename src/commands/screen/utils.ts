import Jimp from 'jimp';
import robot from 'robotjs';

export const base64Image = async (
  buffer: Buffer,
  width: number,
  height: number,
): Promise<string> => {
  const jimp = new Jimp(width, height);
  let red: number;
  let green: number;
  let blue: number;

  buffer.forEach((byte, i) => {
    switch (i % 4) {
      case 0:
        return (blue = byte);
      case 1:
        return (green = byte);
      case 2:
        return (red = byte);
      case 3:
        jimp.bitmap.data[i - 3] = red;
        jimp.bitmap.data[i - 2] = green;
        jimp.bitmap.data[i - 1] = blue;
        jimp.bitmap.data[i] = 255;
    }
  });

  const result = await jimp.getBase64Async(Jimp.MIME_PNG);
  return result;
};

export const calculateMousePosition = (
  width: number,
  height: number,
): { x: number; y: number } => {
  const HALF_WIDTH = width / 2;
  const HALF_HEIGHT = height / 2;

  const mouse = robot.getMousePos();
  const screenSize = robot.getScreenSize();

  let x = mouse.x - HALF_WIDTH;
  let y = mouse.y - HALF_HEIGHT;

  if (mouse.x < HALF_WIDTH) {
    x = 0;
  }

  if (mouse.y < HALF_HEIGHT) {
    y = 0;
  }

  if (mouse.x > screenSize.width - HALF_WIDTH) {
    x = screenSize.width - width;
  }

  if (mouse.y > screenSize.height - HALF_HEIGHT) {
    y = screenSize.height - height;
  }

  return { x, y };
};
