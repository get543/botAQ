const { Telegraf } = require('telegraf');
require('dotenv').config();

// keepAlive function
const express = require('express');
const server = express();

server.all(`/`, (req, res) => {
    res.send(`Result: [OK].`);
});

function keepAlive() {
    server.listen(3000, () => {
        console.log('Server is now ready! | ' + Date.now());
    });
}

// Bot Start
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', ctx => {
    console.log(ctx.from)
        bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot.', {
    });
});


// method that displays the inline keyboard buttons 
// without using slash "/" bot.on || bot.hears
bot.hears('kucing kecil', ctx => {
    ctx.replyWithSticker({ source: 'res/stickers/kucing-kecil.webp' })
})

bot.command('animals', ctx => {
    console.log(ctx.from);
    let animalMessage = `great, here are pictures of animals you would love`;
    bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "dog",
                        callback_data: 'dog'
                    },
                    {
                        text: "hapis",
                        callback_data: 'hapis'
                    },
                    {
                        text: "dog swag",
                        callback_data: 'dog_udski'
                    },
                    {
                        text: "cat hybrid",
                        callback_data: 'cat'
                    },
                ],

            ]
        }
    })
})

// method that returns image of a dog
bot.action('dog', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/dog_gans.jpg"
    });
});

// method that returns image of a hapis 
bot.action('hapis', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/hapis.jpg"
    });
});

// method that returns image of a dog udud 
bot.action('dog_udski', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/dog_udski.png"
    });
});

// method that returns image of a cat
bot.action('cat', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/cat.jpg"
    });
});

// using slash "/"
bot.command('hai', (ctx) => ctx.reply('Hello'));
bot.command('lamda', Telegraf.reply('??'));
bot.command('omega', Telegraf.reply('??'));
bot.command('nyimak', Telegraf.reply('????????'));
bot.command('spam', (ctx) => {
    for (let i = 0; i < 20; i++) {
        ctx.reply('???');
    }
});




// belom bisa
bot.command('gif',  (ctx) => {
    const keyword = ctx.text;
    bot.telegram.sendPhoto(ctx.chat.id, searchGifs(keyword))
})

// ini apalagi
bot.on('inline_query', (ctx) => {
    const result = []
    // Explicit usage
    ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)
  
    // Using context shortcut
    ctx.answerInlineQuery(result)
})

bot.launch(console.log('BotAQ activated!'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

keepAlive();