import { OAuth2Client } from 'google-auth-library';
import { readFile } from 'node:fs';
import * as path from 'node:path';

const googleJsonPath = path.resolve('google-oauth.json');
const oauthConfig = JSON.parse(await readFile(googleJsonPath, 'utf-8'));

const clientId = getEnvVar('GOOGLE_OAUTH_CLIENT_ID');
const clientSecret = getEnvVar('GOOGGOOGLE_OAUTH_CLIENT_SECRET');

const googleOAuthClient = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: oauthConfig.web.redirect_uris[0],
});

export const genereteOAuthUrl = () => {
  const url = googleOAuthClient.generateAuthUrl({
    scope:
  });
};
