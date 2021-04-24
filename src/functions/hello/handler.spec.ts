import { mocked } from 'ts-jest/utils';
import { Handler } from 'aws-lambda';

import { middyfy } from '@libs/lambda';

jest.mock('@libs/lambda');

describe('hello', () => {
  let main;
  let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

  beforeEach(async () => {
    try {
      mockedMiddyfy = mocked(middyfy);
      mockedMiddyfy.mockImplementation((handler: Handler) => {
        return handler as never;
      });
    } catch(err) {
      console.log(err);
    }

    main = (await import('./handler')).main;
  });

  it('should return hello object', async () => {
    const event = {
      body: {
        name: 'test-name'
      }
    } as any;
    const actual = await main(event);
    expect(actual).toEqual({
      message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
      event,
    });
  });
});
