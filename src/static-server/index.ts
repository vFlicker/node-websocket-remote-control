import path from 'path';
import { createServer } from 'http';
import { readFile } from 'fs';

export const staticServer = createServer(({ url }, res) => {
  const __dirname = path.resolve(path.dirname(''));
  const indexFilePath = url === '/' ? '/front/index.html' : '/front' + url;
  const filePath = `${__dirname}${indexFilePath}`;

  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});
