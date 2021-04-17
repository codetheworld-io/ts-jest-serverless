import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';
import { AWSFunction } from '@libs/lambda';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'hello',
        request: {
          schemas: {
            'application/json': schema
          }
        }
      }
    }
  ]
} as AWSFunction;
