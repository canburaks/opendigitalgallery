import {
  IG_BACKEND_ACCESS_TOKEN_ENDPOINT,
  IG_USER_ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  IG_USER_USER_MEDIA_LOCAL_STORAGE_KEY
} from '@/constants/instaprint';
import type { IGMedia } from '@/types';

export class Instagram {
  
  // constructor params 
  public appId: string;
  public redirectUri: string;
  
  // default urls
  public instagramApiBaseUrl = 'https://api.instagram.com/';
  public graphApiBaseUrl = 'https://graph.instagram.com';
  public graphApiMediaUrl = 'https://graph.instagram.com/me/media';

  // computed urls in constructor
  public authUrl: string;
  public tokenUrl: string;

  // some default params
  public grantType = 'authorization_code'
  public responseType = "code"
  public scope = "user_profile,user_media"
  public mediaFields = "id,caption,media_type,media_url,username,timestamp"

  // computed later on
  public code: string | null = null;
  public userId: string | null = null;
  public accessToken: string | undefined = undefined;
  public media: IGMedia[] = [];

  constructor(appId: number | string, redirectUri: string) {
    if (!appId || !redirectUri) {
      throw new Error('AppId and redirectUri are required');
    }
    this.appId = appId?.toString() ?? "";
    this.redirectUri = redirectUri;
    this.authUrl = `${this.instagramApiBaseUrl}oauth/authorize?client_id=${appId}&redirect_uri=${redirectUri}&scope=${this.scope}&response_type=${this.responseType}`;
    this.tokenUrl = `${this.instagramApiBaseUrl}oauth/access_token`;
    console.log("this", this)
  }
  public getUrl(): string | void {
    if (window?.location) {
      return this.authUrl;
    }
  }
  public getCodeFromUrl(): string | void | null {
    if (!window.location.href.includes('?code=')) {
      throw new Error('No code in url');
    }
    const rawSearch = window.location.search.replace('#_', '').replace('?', '');
    const code = rawSearch.split('code=')[1];
    if (code) {
      this.code = code;
      return code;
    }
  }
  public async getAccessToken(code: string): Promise<string | void | null> {
    try {
      const response = await fetch(IG_BACKEND_ACCESS_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code || this.code }),
      });
      const jsonResponse = await response.json();
      this.accessToken = jsonResponse.access_token;
      this.userId = jsonResponse.user_id;
      localStorage.setItem(IG_USER_ACCESS_TOKEN_LOCAL_STORAGE_KEY, jsonResponse.access_token);
      return jsonResponse.access_token;
    } catch (e) {
      console.error('error', e);
      throw new Error(JSON.stringify(e));
    }
  }
  public async getMedia(token?: string, callback?: (media: IGMedia[]) => void): Promise<IGMedia[]> {
    /**
     * This function returns the data for all media items
     */
    try {

      const accessToken = token ? token : this.accessToken;
      const endpoint = `${this.graphApiMediaUrl}?fields=${this.mediaFields}&access_token=${accessToken}`;
      const response = await fetch(endpoint)
      const jsonResponse = await response.json();
      const responseData = jsonResponse.data;
      console.log('responseData', responseData);
      this.media = responseData;
      localStorage.setItem(IG_USER_USER_MEDIA_LOCAL_STORAGE_KEY, JSON.stringify(responseData));
      if (callback) { 
        callback(responseData);
      }
      return responseData;
    } catch (e){
      console.error('error', e);
      throw new Error(JSON.stringify(e));
    }

  }

  public async getMediaData(mediaId: string): Promise<IGMedia> {
    /**
     * This function returns the data for a single media item
     */
    try {
      const endpoint = `${this.graphApiBaseUrl}/${mediaId}?fields=${this.mediaFields}&access_token=${this.accessToken}`;
      const response =  await fetch(endpoint)
      const jsonResponse = response.json();
      return jsonResponse;
    } catch (e){
      console.error('error', e);
      throw new Error(JSON.stringify(e));
    }
  }

}

const appId = process.env.INSTAGRAM_APP_ID!;
const redirectUri = process.env.INSTAGRAM_APP_REDIRECT_URI!;
// const isDevelopment = process.env.NODE_ENV === 'development';

// export const instagramClient = new Instagram(process.env.INSTAGRAM_APP_ID!, process.env.INSTAGRAM_APP_REDIRECT_URI!);