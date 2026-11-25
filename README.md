# Sample Node.js App

A dependency-free HTTP app for practicing Git and CI/CD workflows. Requires
Node.js 18 or newer.

## Run

```sh
npm start
```

By default, the app listens on port 3000. Set `PORT` to use a different port.

- `GET /` returns a welcome message.
- `GET /health` returns `{"status":"ok"}`.

## Test

```sh
npm test
```
