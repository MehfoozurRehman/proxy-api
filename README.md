# Proxy API

A small Express server that forwards a request to a URL the caller supplies, with CORS enabled.

**Status:** Stub. The whole project is one 40-line `index.js` with no tests and no deployment configuration, so it is a working single-file proxy rather than a finished service.

## The problem

Browsers block frontend code from calling APIs that do not send CORS headers. This server takes a request from a frontend, sends it on to the URL in the `url` query parameter, and returns the upstream JSON response.

## What it does

- Accepts any HTTP method on `/proxy` and returns 400 when the `url` query parameter is missing.
- Re-sends the request to the target URL with the same method, body and headers, using axios.
- Returns the upstream response body as JSON. On failure it logs the error and returns a 500 with a generic message.
- Enables CORS for all origins through the `cors` middleware.
- Reads the port from the `PORT` environment variable, defaulting to 9000.

## How it's built

Node.js with Express 4. Axios makes the outbound request, `cors` handles the browser headers, and `dotenv` loads environment variables. The design is a single catch-all route, `app.all("/proxy")`, with no other modules.

## Running it locally

```bash
npm install
npm start
```

`npm start` runs `node index.js`. The server logs the port it listens on, then accepts requests such as `GET /proxy?url=<target URL>`.

## What's left

- There is no host allow-list. Any URL can be requested, including internal network addresses, so the proxy needs restrictions before it is deployed anywhere.
- Incoming headers, including `host`, are forwarded to the target unchanged.
- Responses are always passed through `res.json`, so a non-JSON upstream response comes back as a JSON-encoded string instead of its original content type.
- There are no tests and no example requests in the repository.
