const doppler = require("./doppler");

doppler.fetchSecrets();

require("./config/global");

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
