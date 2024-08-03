import { readFileSync } from 'fs';
import { FileType, Point, Region, mouse, screen } from '@nut-tree-fork/nut-js';

import { Command } from '../../types';

const SCREENSHOT_WIDTH = 200;
const SCREENSHOT_HEIGHT = 200;

export const screenshotCommand: Command = {
  name: 'prnt_scrn',

  async execute(): Promise<string> {
    const [mousePos, screenWidth, screenHeight] = await getScreenDetails();

    const screenshotRegion = calculateScreenshotRegion(
      mousePos,
      screenWidth,
      screenHeight,
    );

    const screenshotURL = await captureScreenshot(screenshotRegion);
    const base64Screenshot = encodeToBase64(screenshotURL);

    return `${this.name} ${base64Screenshot}`;
  },
};

const getScreenDetails = async (): Promise<[Point, number, number]> => {
  const mousePos = await mouse.getPosition();
  const screenWidth = await screen.width();
  const screenHeight = await screen.height();

  return [mousePos, screenWidth, screenHeight];
};

const calculateScreenshotRegion = (
  mousePos: Point,
  screenWidth: number,
  screenHeight: number,
): Region => {
  const HALF_WIDTH = SCREENSHOT_WIDTH / 2;
  const HALF_HEIGHT = SCREENSHOT_HEIGHT / 2;

  let x = mousePos.x - HALF_WIDTH;
  let y = mousePos.y - HALF_HEIGHT;

  x = Math.max(0, Math.min(x, screenWidth - SCREENSHOT_WIDTH));
  y = Math.max(0, Math.min(y, screenHeight - SCREENSHOT_HEIGHT));

  return new Region(x, y, SCREENSHOT_WIDTH, SCREENSHOT_HEIGHT);
};

const captureScreenshot = async (region: Region): Promise<string> => {
  return screen.captureRegion('screenshot', region, FileType.JPG);
};

const encodeToBase64 = (filePath: string): string => {
  const bitmap = readFileSync(filePath);
  return Buffer.from(bitmap).toString('base64');
};
