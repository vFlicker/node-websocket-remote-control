import { mouse, right } from '@nut-tree-fork/nut-js';

import { Command } from '../../types';

export const mouseRightCommand: Command = {
  name: 'mouse_right',

  async execute(shiftX: number): Promise<string> {
    await mouse.move(right(shiftX));
    return `${this.name} executed successfully`;
  },
};
