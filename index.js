require('dotenv').config();

const {App} = require('@slack/bolt');

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGINING_SECRET,
})

// Listen to the app_home_opened Events API event to hear when a user opens your app from the sidebar
app.event("app_home_opened", async ({ payload, client }) => {
    const userId = payload.user;
    
    try {
      // Call the views.publish method using the WebClient passed to listeners
      const result = await client.views.publish({
        user_id: userId,
        view: {
          // Home tabs must be enabled in your app configuration page under "App Home"
          "type": "home",
          "blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "*Welcome home, <@" + userId + "> :house:*"
              }
            },
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "This is a Hello World App for Slack. :wave:"
              }
            },
            {
              "type": "divider"
            },
            {
              "type": "context",
              "elements": [
                {
                  "type": "mrkdwn",
                  "text": "Psssst this home tab was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>"
                }
              ]
            }
          ]
        }
      });

    }
    catch (error) {
      console.error(error);
    }
});

// event to say hi to a new member of the channel.

app.message('hello', async ({ message, client, logger }) => {
  try {
    // Call chat.scheduleMessage with the built-in client
    const result = await client.chat.postMessage({
      channel: message.channel,
      text: `Welcome to the team, <@${message.user}>! 🎉`
    });
    logger.info(result);
  }
  catch (error) {
    logger.error(error);
  }
});


async function startNodeProcess() {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
}

startNodeProcess();