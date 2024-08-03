import { left, mouse } from '@nut-tree-fork/nut-js';

import { Command } from '../../types';

export const mouseLeftCommand: Command = {
  name: 'mouse_left',

  async execute(shiftX: number): Promise<string> {
    await mouse.move(left(shiftX));
    return `${this.name} executed successfully`;
  },
};
