export type InstagramTokenFunctionParams = {
  code: string;
  client_id: number | string;
  client_secret: string;
  redirect_uri: string;
  grant_type: string;
};

export type IGMedia = {
  id: string;
  caption?: string;
  media_type: string;
  media_url: string;
  username: string;
  timestamp: string;
};
