require("dotenv").config();
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// TODO handle cookies with express middleware
// TODO populate current user with express middleware

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  details => {
    console.log(`Server started on port ${details.port}...`);
  }
);
