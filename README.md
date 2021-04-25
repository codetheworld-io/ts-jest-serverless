# ts-jest-serverless

Source code for [How To Start Typescript + Node AWS Function With ServerlessJS?](https://hoangdv.medium.com/how-to-start-typescript-node-aws-function-with-serverlessjs-ef4b55910127)

## How to start?

1. Install dependencies

```
npm ci
```

2. Run unit test

```
npm run test
```

3. Start dev server

```
npm run offline
```

4. Play

```
curl --location --request POST 'localhost:3000/hello' \
    --header 'Content-Type: application/json' \
    --data-raw '{ "name": "hoangdv" }'
```
