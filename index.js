const { Telegraf } = require("telegraf");
require("dotenv").config();

// keepAlive function
const express = require("express");
const server = express();

const currentDate = new Date();
const hours = ("0" + currentDate.getHours()).slice(-2);
const minutes = ("0" + currentDate.getMinutes()).slice(-2);
const seconds = ("0" + currentDate.getSeconds()).slice(-2);

server.all("/", (req, res) => {
  res.send("Result: [OK].");
});

function keepAlive() {
  server.listen(3000, () => {
    console.log(`Server is now ready! | ${hours}:${minutes}:${seconds}`);
  });
}

// Bot Start
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("start", (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(ctx.chat.id, "hello there! Welcome to my new telegram bot.", {});
});

// method without using slash "/" bot.on || bot.hears
bot.hears("kucing kecil", (ctx) => {
  ctx.replyWithSticker({ source: "res/stickers/kucing-kecil.webp" });
});

// method that displays the inline keyboard buttons
bot.command("animals", (ctx) => {
  console.log(ctx.from);
  let animalMessage = `great, here are pictures of animals you will love like`;
  bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "dog",
            callback_data: "dog",
          },
          {
            text: "hapis",
            callback_data: "hapis",
          },
          {
            text: "dog swag",
            callback_data: "dog_udski",
          },
          {
            text: "cat hybrid",
            callback_data: "cat",
          },
        ],
      ],
    },
  });
});

// method that returns image of a dog
bot.action("dog", (ctx) => {
  bot.telegram.sendPhoto(ctx.chat.id, {
    source: "res/dog_gans.webp",
  });
});

// method that returns image of a hapis
bot.action("hapis", (ctx) => {
  bot.telegram.sendPhoto(ctx.chat.id, {
    source: "res/hapis.webp",
  });
});

// method that returns image of a dog udud
bot.action("dog_udski", (ctx) => {
  bot.telegram.sendPhoto(ctx.chat.id, {
    source: "res/dog_udski.webp",
  });
});

// method that returns image of a cat
bot.action("cat", (ctx) => {
  bot.telegram.sendPhoto(ctx.chat.id, {
    source: "res/cat.webp",
  });
});

// using slash "/"
bot.command("hai", (ctx) => ctx.reply("Hello"));
bot.command("lamda", Telegraf.reply("λ"));
bot.command("omega", Telegraf.reply("Ω"));
bot.command("nyimak", Telegraf.reply("😑👂"));
bot.command("spam", (ctx) => {
  for (let i = 0; i < 20; i++) {
    ctx.reply("∞");
  }
});

bot.launch(console.log("BotAQ activated!"));

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

keepAlive();
