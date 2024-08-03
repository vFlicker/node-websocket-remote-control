import { mouse, up } from '@nut-tree-fork/nut-js';

import { Command } from '../../types';

export const mouseUpCommand: Command = {
  name: 'mouse_up',

  async execute(shiftY: number): Promise<string> {
    await mouse.move(up(shiftY));
    return `${this.name} executed successfully`;
  },
};
