import 'dotenv/config';

import { Logger } from '@nestjs/common';

const getProcessEnv = (name: string): string => {
  const value = process.env[name];
  if (value === undefined) {
    const err = `${name} 환경변수가 정의되지 않았습니다`;
    Logger.error(err, 'getProcessEnv');
    throw new Error(err);
  }
  return value;
}

export default {
  APP: {
    PORT: parseInt(getProcessEnv('PORT')),
  },
  GITHUB: {
    TOKEN: getProcessEnv('GITHUB_TOKEN'),
    GQL: {
      URL: getProcessEnv('GITHUB_GQL_URL'),
    },
    REST: {
      URL: getProcessEnv('GITHUB_REST_URL'),
    },
  },
};
