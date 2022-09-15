"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const appendSheet_1 = require("./utils/appendSheet");
require("dotenv").config({ path: '.env' });
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => { ctx.reply('The Lucky Draw has started!'); });
bot.on('new_chat_members', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('new member:', ctx.from);
    try {
        yield (0, appendSheet_1.appendSheet)({
            user: `@${ctx.from.username}`,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
bot.launch();
console.log('Bot has started!....');
