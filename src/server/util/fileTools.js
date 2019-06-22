import fs from 'fs';

const readFile = async (path, opt = {}) => {
  const defaultOpt = {
    encoding: 'utf8',
    flag: 'a+',
  };
  return new Promise((resolve, reject) => {
    fs.readFile(path, {
      ...defaultOpt,
      opt,
    }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const removeFile = async path => new Promise((resolve, reject) => {
  fs.unlink(path, (err) => {
    if (err) reject(false);
    resolve(true);
  });
});

export default {
  readFile,
  removeFile,
};
