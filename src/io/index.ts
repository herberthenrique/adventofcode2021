import fs from 'fs';

export const readFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log('err: ', err);
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
};

export const readFileIntoArray = (filePath: string): Promise<number[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log('err: ', err);
        reject(err);
      } else {
        resolve(data.toString().split('\n').map(Number));
      }
    });
  });
};
