import middy from '@middy/core';
import type { AWS } from '@serverless/typescript';
import middyJsonBodyParser from '@middy/http-json-body-parser';

import { apiGatewayResponseMiddleware } from './middleware';

export const middyfy = (handler) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(apiGatewayResponseMiddleware({ enableErrorLogger: process.env.IS_OFFLINE === 'true' }));
}

export type AWSFunction = AWS['functions'][0];
