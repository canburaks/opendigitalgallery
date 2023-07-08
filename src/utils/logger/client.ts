import pino from 'pino';

export const loggerBrowser = pino({
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
});

export default loggerBrowser;
