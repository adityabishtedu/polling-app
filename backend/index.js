const server = require("./src/app").server();

async function init() {
  try {
    await server.create();

    server.start();
  } catch (err) {
    logger.error(err);
  }
}

init();
