type NodeEnv = 'development' | 'preview' | 'production';
export function getUrl(): string | undefined {
  const nodeEnv = process.env.VERCEL_ENV as NodeEnv;
  let url = undefined;
  if (nodeEnv === 'development') {
    url = process.env.DEVELOPMENT_URL;
  } else if (nodeEnv === 'preview') {
    url = process.env.STAGING_URL;
  } else if (nodeEnv === 'production') {
    url = process.env.PRODUCTION_URL;
  } else {
    console.error('Unknown NODE_ENV', nodeEnv);
    url = process.env.DEVELOPMENT_URL;
  }
  if (url?.endsWith('/')) {
    url = url.slice(0, -1);
  }
  return url;
}
