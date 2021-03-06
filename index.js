const TelegramBot= require('node-telegram-bot-api');
const dialogflow = require('./dialogflow.js');
const youtube = require('./youtube.js');

const token='1608127341:AAGNLhzzPZxh6VjFFNfj6J1H_6NoPnU790A';

const bot = new TelegramBot(token,{polling: true});

bot.on('message', async function(msg){
    const chatId = msg.chat.id;
    console.log(msg.text);

   
    const dFresponse = await dialogflow.sendMessage(chatId.toString(), msg.text);
    let responseText = df.responseText;

    if(dFresponse.intent==='programar em node'){
        responseText = youtube.searchVideo(responseText, dFresponse.fields.node.stringValue);
    }

    bot.sendMessage(chatId, responseText);
});

