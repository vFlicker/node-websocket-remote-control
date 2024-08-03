export type Payload = number[];

export interface Action {
  type: string;
  payload: Payload;
}

export interface Command {
  name: string;
  execute: (...payload: Payload) => Promise<string>;
}

export interface Commands {
  [key: string]: Command;
}
