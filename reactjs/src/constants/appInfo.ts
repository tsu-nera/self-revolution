export const APP_NAME = 'Titan';
export const APP_TITLE = `${APP_NAME} | 自己変革の火をつけるアプリ`;
export const APP_DESCRIPTION =
  '自分を変える若者のためのアプリです。自己変革を支援します。';
export const APP_PRODUCTION_URL = 'https://titan-fire.com';
export const APP_DEVELOPMENT_URL = 'https://titan-dev-1234.firebaseapp.com';
export const APP_DEVELOPMENT_LOCAL_URL = 'http://localhost:3000';

export const TITAN_LANDING_PAGE = 'https://titan-fire.netlify.com';
export const TITAN_TERMS_OF_USE = 'https://titan-fire.com/#/terms_of_use';
export const TITAN_PRIVACY_POLICY = 'https://titan-fire.com/#/privacy_policy';
export const TITAN_GUIDELINES = 'https://titan-fire.com/#/guidelines';
export const TITAN_BLOG_URL = 'https://note.mu/titan_dev';
export const TITAN_TWITTER_URL = 'https://twitter.com/titan_dev_1234';
export const TITAN_DISCORD_INVITE_URL = 'https://discord.gg/S3t5WgE';

export const TITAN_GOOGLE_PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.futurismo.titan';
export const TITAN_APPLE_STORE =
  'https://apps.apple.com/us/app/titan-%E7%BF%92%E6%85%A3%E3%83%81%E3%83%A3%E3%83%AC%E3%83%B3%E3%82%B8%E3%81%A7%E8%87%AA%E5%88%86%E3%82%92%E5%A4%89%E3%81%88%E3%82%8Bsns/id1474759445';

const urlMap = new Map();
urlMap.set('development', APP_DEVELOPMENT_URL);
urlMap.set('production', APP_PRODUCTION_URL);

export const APP_URL =
  process.env.REACT_APP_ENV === 'development'
    ? APP_DEVELOPMENT_LOCAL_URL
    : urlMap.get(process.env.NODE_ENV);

export const APP_ICON_URL = `${APP_URL}/icon.png`;
