const http = require("node:http");
const { createApp } = require("./src/app");

function createServer() {
  return http.createServer(createApp());
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  createServer().listen(port, () => {
    console.log(`Sample Express app listening on port ${port}`);
  });
}

module.exports = { createServer };
