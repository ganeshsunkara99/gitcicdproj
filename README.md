# Sample Express REST API

An Express REST API for practicing Docker, Git, and CI/CD workflows. Requires
Node.js 18 or newer.

## Run

```sh
npm start
```

By default, the app listens on port 3000. Set `PORT` to use a different port.

- `GET /` returns a welcome message.
- `GET /health` returns `{"status":"ok"}`.
- `GET /api/items` lists items.
- `POST /api/items` creates an item with a `name` and optional `description`.
- `GET /api/items/:id` reads an item.
- `PUT /api/items/:id` updates an item's `name` and optional `description`.
- `DELETE /api/items/:id` deletes an item.

Items are stored in memory, so they reset when the app restarts. This sample
does not use a database.

## Project structure

The app uses a simple Model-View-Controller (MVC) layout:

```text
server.js                 # Root entry point; starts the HTTP server
src/
  app.js                  # Express app and middleware setup
  models/itemModel.js     # In-memory item data operations
  views/itemView.js       # Shapes item data for JSON responses
  controllers/itemController.js
  routes/itemRoutes.js    # Maps item URLs and methods to controllers
```

For this REST API, the view layer formats JSON response data rather than
rendering HTML pages.

## Test

```sh
npm test
```

## Docker

Build and run the app locally:

```sh
docker build -t gitcicdproj .
docker run --rm -p 3000:3000 gitcicdproj
```

Open `http://localhost:3000`. To stop the app, press `Ctrl+C`.

## CI/CD with Docker Hub

The GitHub Actions workflow runs the tests and builds the Docker image for pull
requests to `main`. When code is pushed to `main`, it also publishes the image
to Docker Hub with both a commit-specific tag and the `latest` tag. A manual
workflow run also publishes when started from `main`.

### Setup

1. Create a Docker Hub account and a repository named `gitcicdproj`.
2. Create a Docker Hub access token with permission to write to that repository.
3. In the GitHub repository, go to **Settings → Secrets and variables →
   Actions → New repository secret** and add:
   - `DOCKERHUB_USERNAME`: your Docker Hub username.
   - `DOCKERHUB_TOKEN`: the access token you created. Do not use your Docker
     Hub password or share the token.

After adding the secrets, push a commit to `main`. The image will be available
at `docker.io/YOUR_DOCKERHUB_USERNAME/gitcicdproj`. Pull and run it with:

```sh
docker pull YOUR_DOCKERHUB_USERNAME/gitcicdproj:latest
docker run --rm -p 3000:3000 YOUR_DOCKERHUB_USERNAME/gitcicdproj:latest
```
