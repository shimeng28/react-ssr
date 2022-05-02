import path from 'path';

const config = {
  tmpPath: path.resolve(process.cwd(), './build/client/~tmp.html'),
  staticPath: path.resolve(process.cwd(), './build/client'),
  staticPort: 9527,
  service: {
    '/api': 'http://127.0.0.1:3000',
  },
};

export default config;
