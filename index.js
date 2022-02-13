require('dotenv').config();

const {App} = require('@slack/bolt');
const store = require('./store');

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGINING_SECRET
})

app.event('app_home_opened', async ({event, say})=> {
    // Look up the user from the DB

    if(event?.user){

        await say(`Hello world, and welcome <@${event.user}>!`)
    }else {
        
        await say('Hi again!')
    }
});


async function startNodeProcess() {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
}

startNodeProcess();