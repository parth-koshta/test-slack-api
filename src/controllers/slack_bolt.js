const { App } = require("@slack/bolt");
require("dotenv").config();
const modal = require('../payloads/creation.json')

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

app.command("/fire", async ({ body, ack, respond, client }) => {
  console.log(body, 'body');
  // console.log(ack, 'ack');
  // console.log(respond, 'respond');
  // console.log(client, 'client');
  await ack();
  try {
    console.log("got it");
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        // View identifier
        callback_id: 'create_incident',
        ...modal
      }
    });
    // const result = await app.client.chat.postMessage({
    //   // The token you used to initialize your app
    //   token: process.env.SLACK_BOT_TOKEN,
    //   channel: body.channel_id,
    //   text: 'Hello there!'
    //   // You could also use a blocks[] array to send richer content
    // });

    // Print result, which includes information about the message (like TS)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

app.view('create_incident', async ({ ack, body, view, client }) => {
  console.log('create_incident');
  await ack({
    "response_action": "clear",
  });
  const result = await app.client.chat.postMessage({
      // The token you used to initialize your app
      token: process.env.SLACK_BOT_TOKEN,
      channel: body.user.id,
      text: 'Hello there!'
      // You could also use a blocks[] array to send richer content
    });
})

app.action('choose-state', async ({ ack }) => {
  await ack();
});

const init = (req, res) => {
  try {
    res.send("Hello from the other side!!!");
  } catch (error) {}
};

module.exports = {
  init,
  boltApp: app,
};
