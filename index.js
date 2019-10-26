const telegram = require('telegram-bot-api')

const token = '385017512:AAHrISO0n6qaEcYbZq9utTdT8PqWLZw3Y7A';

const api = new telegram({
    token: token,
    polling: true,
    updates: {
        enabled: true
}
});

api.on('message', function(message)
{
    // Received text message
    console.log(message);
    api.sendMessage(
        {chat_id: message.chat.id,
         text: 'hello darling'
        },
     'message');
    // api.sendVideo();
});

