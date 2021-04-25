import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { formatJSONResponse } from './apiGateway';
import { AppError } from './appError';
import MiddlewareFunction = middy.MiddlewareFunction;

export const apiGatewayResponseMiddleware = (options: { enableErrorLogger?: boolean } = {}) => {

  const after: MiddlewareFunction<APIGatewayProxyEvent, any> = async (request) => {
    if (!request.event?.httpMethod || request.response === undefined || request.response === null) {
      return;
    }

    const existingKeys = Object.keys(request.response);
    const isHttpResponse = existingKeys.includes('statusCode')
      && existingKeys.includes('headers')
      && existingKeys.includes('body');

    if (isHttpResponse) {
      return;
    }

    request.response = formatJSONResponse(request.response);
  }

  const onError: MiddlewareFunction<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request) => {
    const { error } = request;
    let statusCode = 500;

    if (error instanceof AppError) {
      statusCode = error.statusCode;
    }

    if (options.enableErrorLogger) {
      console.error(error);
    }

    request.response = formatJSONResponse({ message: error.message }, statusCode);
  }

  return {
    after,
    onError,
  };
}
