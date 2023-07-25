// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { InstagramTokenFunctionParams } from '@/types';
import { Instagram } from '@/data/instagramClient';

// @ts-ignore
import querystring from 'querystring';
// @ts-ignore
import { Curl } from 'node-libcurl';

type Data = {
  accessToken?: string;
  user_id?: string;
  error?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!process.env.INSTAGRAM_APP_REDIRECT_URI || !process.env.INSTAGRAM_APP_ID) {
    throw new Error ('Instagram App ID or Redirect URI not found');
  }
  const instagramClient = new Instagram(process.env.INSTAGRAM_APP_ID, process.env.INSTAGRAM_APP_REDIRECT_URI);
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }
  if (code) {
    const accessTokenParams: InstagramTokenFunctionParams = {
      client_id: instagramClient.appId,
      client_secret: process.env.INSTAGRAM_APP_SECRET!,
      grant_type: instagramClient.grantType,
      redirect_uri: instagramClient.redirectUri,
      code,
    };
    const curlTest = new Curl();

    curlTest.setOpt(Curl.option.URL, instagramClient.tokenUrl);
    curlTest.setOpt(Curl.option.POST, true);
    curlTest.setOpt(Curl.option.POSTFIELDS, querystring.stringify(accessTokenParams));
    curlTest.on(
      'end',
      function (this: typeof curlTest, statusCode: number, data: any, headers: any) {
        const responseData = JSON.parse(data);
        if (statusCode !== 200) {
          throw new Error(responseData?.error_message || "Access Token couldn't be retrieved");
            // res.status(404).json({ error: responseData?.error_message || "Access Token couldn't be retrieved" });
        }
        console.log("data", data)
        return res.status(200).json(responseData);
      }
    );
    const terminate = curlTest.close.bind(curlTest);
    curlTest.on('error', terminate);
    curlTest.perform();
  }
}
