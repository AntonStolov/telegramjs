const telegram = require('telegram-bot-api')
const koa = require('koa')
const router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const { PORT, TOKEN, PASSWORD } = require('./config')
const getQuery = require('./getFromMongo')
const sendQuery = require('./sendToMongo')


// const token = '385017512:AAHrISO0n6qaEcYbZq9utTdT8PqWLZw3Y7A';
// const mongoURL = `mongodb+srv://anton:<${PASSWORD}>@cluster0-1fvmc.mongodb.net/telegrambot?retryWrites=true&w=majority`;
const webHookUrl = 'https://622b7d90.ngrok.io';
// const PORT = process.env.PORT;

const api = new telegram({
    token: TOKEN,
    webHook: {
        port: PORT
    }
});

api.setWebhook({
    url: `${webHookUrl}`,
});

const app = new koa();
const rou = new router();

rou.post('', ctx => {
    const { body } = ctx.request;
    console.log(body);
    if (!isNaN(parseFloat(body.message.text))) {
        api.sendMessage(
            {chat_id: body.message.chat.id,
            text: `Hi ${body.message.from.first_name}`
            },
        'message')
        .then(getQuery()
            .then((res) => {
                // // body.message.chat.id == 275374175 ? sendQuery(body.message)
                
                // console.log(res[res.length - 1]);
                console.log(res[0]);
                processing(res[0], body);
                
            }));
    }
    // getQuery.then((res) => console.log(res));
    ctx.status = 200;
});

app.use(bodyParser());
app.use(rou.routes());
app.use(ctx => {
    ctx.body = 'app is working';
    ctx.status = 200;
  });
  
app.listen(PORT, () => {
    console.log(`listing on port: ${PORT}`);
})

function processing(lastObjectFromMongo, body){
    // lastObjectFromMongo = res[0];
            if (body.message.chat.id == -344140765 && !isNaN(parseFloat(body.message.text))) {
                let newBody = body.message;
                if (body.message.from.id == 275374175){
                    newBody.antonToAnex = lastObjectFromMongo.antonToAnex - parseFloat(body.message.text);
                    newBody.alexToAnton = lastObjectFromMongo.alexToAnton + parseFloat(body.message.text);
                    sendQuery(newBody);
                    console.log('sended Query');
                } else {
                    newBody.antonToAnex = lastObjectFromMongo.antonToAnex + parseFloat(String(body.message.text));
                    newBody.alexToAnton = lastObjectFromMongo.alexToAnton - parseFloat(String(body.message.text));
                    sendQuery(newBody);
                    console.log('sended Query');
                }
                api.sendMessage(
                    {chat_id: body.message.chat.id,
                    text: 
                            `
                            Atol to Alex: ${newBody.antonToAnex}
                            Alex to Atol: ${newBody.alexToAnton}
                            `
                    },
                'message')
            }
}