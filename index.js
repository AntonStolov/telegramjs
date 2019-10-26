const telegram = require('telegram-bot-api')
const mongo = require('mongoose')
const koa = require('koa')
const router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const token = '385017512:AAHrISO0n6qaEcYbZq9utTdT8PqWLZw3Y7A';
const mongoURL = 'mongodb+srv://anton:<0000>@cluster0-1fvmc.mongodb.net/telegramBot?retryWrites=true&w=majority';
const webHookUrl = 'https://telegramantonjs.herokuapp.com';

const api = new telegram({
    token: token,
    // polling: true,
    webHook: {
        port: 4000
    }
//     updates: {
//         enabled: true
// }
});

// api.setWebhook(`${webHookUrl}/bot`);
api.setWebhook({
    url: `${webHookUrl}`,
});

const app = new koa();
const rou = new router();

rou.post('', ctx => {
    const { body } = ctx.request;
    console.log(body);
    api.sendMessage(
        {chat_id: body.message.chat.id,
        text: 'hello darling'
        },
    'message');
    ctx.status = 200;
})
app.use(bodyParser());
app.use(rou.routes());

app.listen(4000, () => {
    console.log('listing on port: 4000')
})


api.on('message', function(message)
{
    // Received text message
    console.log(message);
    api.sendMessage(
        {chat_id: message.chat.id,
        text: 'hello darling'
        },
    'message');
});



// mongo.connect(mongoURL, {
//     useNewUrlParser: true
// })
// .then(() => console.log('conected MDB'))
// .catch(err => console.log(err));