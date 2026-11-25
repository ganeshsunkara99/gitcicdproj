const http = require("node:http");

function createServer() {
  return http.createServer((request, response) => {
    if (request.method === "GET" && request.url === "/health") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ status: "ok" }));
      return;
    }

    if (request.method === "GET" && request.url === "/") {
      response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Hello from the sample Node.js app!\n");
      return;
    }

    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: "Not found" }));
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  createServer().listen(port, () => {
    console.log(`Sample app listening on port ${port}`);
  });
}

module.exports = { createServer };
