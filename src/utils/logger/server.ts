import pino from 'pino';

const dest = pino.destination('.logs/logs.log');

export const loggerServer = pino(
  {
    browser: {
      serialize: true,
    },
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
    level: 'debug',
    sync: true,
    base: {
      env: process.env.NODE_ENV,
      revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
    },
  },
  dest
);

export default loggerServer;
