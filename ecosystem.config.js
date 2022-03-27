require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "Server",
      script: "node server.js",

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
    {
      name: "Client",
      script: "npm prod && serve -s build",

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
