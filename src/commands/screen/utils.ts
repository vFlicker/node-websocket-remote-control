import Jimp from 'jimp';

export const base64Image = async (
  buffer: Buffer,
  width: number,
  height: number,
) => {
  const jimp = new Jimp(width, height);
  let red: number, green: number, blue: number;
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
