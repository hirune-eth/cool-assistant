"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
});
//定数
const CHANNEL_ID_S = process.env.SEND_CHANNEL_ID;
const CHANNEL_ID_C = process.env.COMMAND_CHANNEL_ID;
const REMINDER_TO_MENTION_ID = process.env.REMINDER_TO_MENTION_ID;
const REACT_EMOJI = process.env.REACT_EMOJI;
const prefix = '!';
const channel = client.channels.cache.get(CHANNEL_ID_S);
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const dayOfWeek = date.getDay();
const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
const title1 = '【Cool秘書日報】';
const title2 = '★気になる内容のリンクを押すと詳細が見れますよ！';
const title_day = '★日時：' + year + '/' + month + '/' + day + ' (' + dayOfWeekStr + ') 分';
//初期化
let messages = '';
let messages_e1 = '';
let messages_e2 = '';
let messages_e3 = '';
let messages_e4 = '';
let messages_e5 = '';
let users = '';
let colum = '';
//定時実行
client.on('ready', () => {
    console.log('[' + new Date() + '] The bot is ready');
    const cron = require('node-cron');
    //7:00メッセージ送信
    cron.schedule('0 7 * * *', () => {
        //console.log('message.length:' + messages.length);
        //console.log('messages_e1.length:' + messages_e1.length);
        //console.log('messages_e2.length:' + messages_e2.length);
        sendMessage();
    });
    //13:00メモリクリア
    cron.schedule('0 13 * * *', () => {
        messages = '';
        messages_e1 = '';
        messages_e2 = '';
        messages_e3 = '';
        messages_e4 = '';
        messages_e5 = '';
        users = '';
        colum = '';
        console.log('[' + new Date() + '] ■■■メモリクリア■■■');
    });
});
//メッセージ登録
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if it's from a bot
        if (message.author.bot)
            return;
        // If it's from the target person
        if (message.author.id === REMINDER_TO_MENTION_ID) {
            return;
        }
        console.log('Debug:001');
        if (checkMessage(message) && message.reference == null) {
            let author = message.author;
            let username = author.username;
            let result = users.indexOf(username);
            console.log('result:' + result);
            if (result == -1) {
                users = users + '\n' + username;
                console.log('user add');
            }
            let str = message.content.replace('<@1033544892976209930>', '\n');
            console.log('--------------------------');
            console.log('str.length：' + String(str).length);
            console.log('messages.length：' + messages.length);
            console.log('messages_e1.length：' + messages_e1.length);
            console.log('messages_e2.length：' + messages_e2.length);
            console.log('colum.length：' + colum.length);
            console.log('Debug:002');
            if (str.match(/本日のコラム/)) {
                colum = str;
                console.log('[' + new Date() + '] ■■■コラム登録■■■');
                console.log('Debug:003');
                //console.log(colum)
                message.react(REACT_EMOJI);
            }
            else if (messages.length + String(str).length < 3000) {
                messages = messages + '\n' + str;
                console.log('[' + new Date() + '] ■■■メッセージ登録(単一)■■■');
                console.log('message.length(登録後):' + messages.length);
                //console.log(messages);
                message.react(REACT_EMOJI);
            }
            else if (messages_e1.length + String(str).length < 3000) {
                messages_e1 = messages_e1 + '\n' + str;
                console.log('[' + new Date() + '] ■■■メッセージ登録(複数1)■■■');
                console.log('message_e1.length(登録後):' + messages_e1.length);
                //console.log(messages_e);
                message.react(REACT_EMOJI);
            }
            else if (messages_e2.length + String(str).length < 3000) {
                messages_e2 = messages_e2 + '\n' + str;
                console.log('[' + new Date() + '] ■■■メッセージ登録(複数2)■■■');
                console.log('message_e2.length(登録後):' + messages_e2.length);
                //console.log(messages_e);
                message.react(REACT_EMOJI);
            }
            else if (messages_e3.length + String(str).length < 3000) {
                messages_e3 = messages_e3 + '\n' + str;
                console.log('[' + new Date() + '] ■■■メッセージ登録(複数3)■■■');
                console.log('message_e3.length(登録後):' + messages_e3.length);
                //console.log(messages_e);
                message.react(REACT_EMOJI);
            }
            else if (messages_e4.length + String(str).length < 3000) {
                messages_e4 = messages_e4 + '\n' + str;
                console.log('[' + new Date() + '] ■■■メッセージ登録(複数4)■■■');
                console.log('message_e4.length(登録後):' + messages_e4.length);
                //console.log(messages_e);
                message.react(REACT_EMOJI);
            }
            else if (messages_e5.length + String(str).length < 3000) {
                messages_e5 = messages_e5 + '\n' + str;
                console.log('[' + new Date() + '] ■■■メッセージ登録(複数5)■■■');
                console.log('message_e5.length(登録後):' + messages_e5.length);
                //console.log(messages_e);
                message.react(REACT_EMOJI);
            }
            else {
                console.log('メッセージサイズオーバー');
            }
        }
    }
    catch (error) {
        console.error('[' + new Date() + '] Catched error at somewhere :' + error);
    }
}));
//メッセージ送信(!newsコマンド)
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (message.content === '!news') {
            //console.log('message.content:' + message.content);
            //console.log('message.length:' + messages.length);
            //console.log('messages_e1.length:' + messages_e1.length);
            //console.log('messages_e2.length:' + messages_e2.length);
            sendMessage();
        }
    }
    catch (error) {
        console.error('[' + new Date() + '] Catched error at somewhere :' + error);
    }
}));
//メッセージ登録
client.on('messageCreate', (message) => {
    try {
        if (!message.content.startsWith(prefix))
            return;
        const [command, ...args] = message.content.slice(prefix.length).split(/\s+/);
        if (command === 'memclear') {
            messages = '';
            messages_e1 = '';
            messages_e2 = '';
            messages_e3 = '';
            messages_e4 = '';
            messages_e5 = '';
            users = '';
            colum = '';
            console.log('[' + new Date() + '] ■■■メモリクリア■■■');
            message.react(REACT_EMOJI);
        }
    }
    catch (error) {
        console.error('[' + new Date() + '] Catched error at somewhere :' + error);
    }
});
function sendMessage() {
    let channel = client.channels.cache.get(CHANNEL_ID_S);
    //単一フレーム送信
    if (messages.length !== 0) {
        const exampleEmbed = new discord_js_1.MessageEmbed()
            .setColor('#25b7c0')
            .setTitle(title1)
            .setAuthor({ name: 'Cool秘書bot', url: 'https://twitter.com/hirune_028' })
            .setDescription(title_day + '\n' + title2 + '\n' + messages);
        console.log('Embed.length:' + exampleEmbed.length);
        console.log('[' + new Date() + '] ■■■メッセージ送信(単一)■■■');
        channel.send({
            //content: `<@&${REMINDER_ALL_MENTION_ID}> \n`,
            embeds: [exampleEmbed]
        });
    }
    //複数フレーム送信1
    if (messages_e1.length !== 0) {
        const exampleEmbed1 = new discord_js_1.MessageEmbed()
            .setColor('#25b7c0')
            .setDescription(messages_e1);
        console.log('Embed1.length:' + exampleEmbed1.length);
        console.log('[' + new Date() + '] ■■■メッセージ送信(複数1)■■■');
        channel.send({
            embeds: [exampleEmbed1]
        });
    }
    //複数フレーム送信2
    if (messages_e2.length !== 0) {
        const exampleEmbed2 = new discord_js_1.MessageEmbed()
            .setColor('#25b7c0')
            .setDescription(messages_e2);
        console.log('Embed2.length:' + exampleEmbed2.length);
        console.log('[' + new Date() + '] ■■■メッセージ送信(複数2)■■■');
        channel.send({
            embeds: [exampleEmbed2]
        });
    }
    //複数フレーム送信3
    if (messages_e3.length !== 0) {
        const exampleEmbed3 = new discord_js_1.MessageEmbed()
            .setColor('#25b7c0')
            .setDescription(messages_e3);
        console.log('Embed3.length:' + exampleEmbed3.length);
        console.log('[' + new Date() + '] ■■■メッセージ送信(複数3)■■■');
        channel.send({
            embeds: [exampleEmbed3]
        });
    }
    //複数フレーム送信4
    if (messages_e4.length !== 0) {
        const exampleEmbed4 = new discord_js_1.MessageEmbed()
            .setColor('#25b7c0')
            .setDescription(messages_e4);
        console.log('Embed4.length:' + exampleEmbed4.length);
        console.log('[' + new Date() + '] ■■■メッセージ送信(複数4)■■■');
        channel.send({
            embeds: [exampleEmbed4]
        });
    }
    //複数フレーム送信5
    if (messages_e5.length !== 0) {
        const exampleEmbed5 = new discord_js_1.MessageEmbed()
            .setColor('#25b7c0')
            .setDescription(messages_e5);
        console.log('Embed5.length:' + exampleEmbed5.length);
        console.log('[' + new Date() + '] ■■■メッセージ送信(複数5)■■■');
        channel.send({
            embeds: [exampleEmbed5]
        });
    }
    //コラム送信
    if (colum.length !== 0) {
        const exampleEmbed6 = new discord_js_1.MessageEmbed()
            .setColor('#25b7c0')
            .setDescription(colum)
            .setFooter('Cool秘書部屋より')
            .setTimestamp();
        console.log('Embed6.length:' + exampleEmbed6.length);
        console.log('[' + new Date() + '] ■■■メッセージ送信(コラム)■■■');
        channel.send({
            embeds: [exampleEmbed6]
        });
    }
}
function checkMessage(message) {
    return REMINDER_TO_MENTION_ID !== "" && (message.content.includes(`<@${REMINDER_TO_MENTION_ID}>`));
}
client.login(process.env.TOKEN);
