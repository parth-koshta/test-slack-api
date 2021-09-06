const express = require("express");
const app = express();
require("dotenv").config();

const SlackBoltController = require("./src/controllers/slack_bolt");

const SlackBoltRouter = require("./src/routes/slack_bolt");

app.use("", SlackBoltRouter);

const PORT = process.env.PORT || 4000;

// app.listen(PORT, async() => {
//   console.log('App listening on port: ', PORT);
//   await SlackBoltController.boltApp.start();
//   console.log('Slack app started!');
// });

(async () => {
    await SlackBoltController.boltApp.start({port: PORT});
    console.log('⚡️ Bolt app started on port', PORT);
  })();