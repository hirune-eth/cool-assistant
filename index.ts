import DiscordJS, { Intents, TextChannel, MessageEmbed, Snowflake, Message }  from 'discord.js'
import { format, eachDayOfInterval } from 'date-fns'
import dotenv from 'dotenv'
dotenv.config()

//定数
const CHANNEL_ID_S = process.env.SEND_CHANNEL_ID as Snowflake
const CHANNEL_ID_C = process.env.COMMAND_CHANNEL_ID as Snowflake
const REMINDER_TO_MENTION_ID = process.env.REMINDER_TO_MENTION_ID as Snowflake
const REMINDER_ALL_MENTION_ID = process.env.REMINDER_ALL_MENTION_ID as Snowflake
const REACT_EMOJI = process.env.REACT_EMOJI as string
const prefix = '!';

//初期化
let messages = '';
let messages_e1 = '';
let messages_e2 = '';
let messages_e3 = '';
let messages_e4 = '';
let messages_e5 = '';
let users = '';
let colum = '';

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
})

client.on('ready', () => {
    console.log('['+new Date()+'] The bot is ready');
    const cron = require('node-cron');
    cron.schedule('0 7 * * *', () => {
        // let channel = client.channels.cache.get(CHANNEL_ID_C) as TextChannel
        // channel.send('!news');
        // console.log('['+new Date()+'] ■■■メッセージ送信■■■')
        let channel = client.channels.cache.get(CHANNEL_ID_S) as TextChannel;
        let date = new Date();
        let year = date.getFullYear() ;
        let month = date.getMonth()+1;
        let day = date.getDate();
        let dayOfWeek = date.getDay();
        let dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek];
        let title1 = '【Cool秘書日報】';
        let title2 = '★気になる内容のリンクを押すと詳細が見れますよ！'
        let title_day = '★日時：' + year +'/' + month + '/' + day + ' (' +dayOfWeekStr + ') 分';
        // let assistant = '★本日の担当秘書↓' + users; future_001

        console.log('message.length:' + messages.length);
        console.log('messages_e1.length:' + messages_e1.length);
        console.log('messages_e2.length:' + messages_e2.length);
        
        //単一フレーム送信
        if ( messages.length !== 0) {
            const exampleEmbed = new MessageEmbed()
                .setColor('#25b7c0')
                .setTitle(title1)
                .setAuthor({ name: 'Cool秘書bot', url: 'https://twitter.com/HiruneSleeping' })
                .setDescription(title_day + '\n' + title2 + '\n' + messages) // future_001
        
            console.log('Embed.length:' + exampleEmbed.length)
            console.log('['+new Date()+'] ■■■メッセージ送信(単一)■■■')
            channel.send({ 
                content: `<@&${REMINDER_ALL_MENTION_ID}> \n`,
                embeds: [exampleEmbed] 
            });
        }

        //複数フレーム送信1
        if ( messages_e1.length !== 0 ) {
            const exampleEmbed1 = new MessageEmbed()
                .setColor('#25b7c0')
                .setDescription(messages_e1)
        
            console.log('Embed1.length:' + exampleEmbed1.length)
            console.log('['+new Date()+'] ■■■メッセージ送信(複数1)■■■')
            channel.send({ 
                embeds: [exampleEmbed1] 
            });
        }

        //複数フレーム送信2
        if ( messages_e2.length !== 0 ) {
            const exampleEmbed2 = new MessageEmbed()
                .setColor('#25b7c0')
                .setDescription(messages_e2)
        
            console.log('Embed2.length:' + exampleEmbed2.length)
            console.log('['+new Date()+'] ■■■メッセージ送信(複数2)■■■')
            channel.send({ 
                embeds: [exampleEmbed2] 
            });
        }

        //複数フレーム送信3
        if ( messages_e3.length !== 0 ) {
            const exampleEmbed3 = new MessageEmbed()
                .setColor('#25b7c0')
                .setDescription(messages_e3)
        
            console.log('Embed3.length:' + exampleEmbed3.length)
            console.log('['+new Date()+'] ■■■メッセージ送信(複数3)■■■')
            channel.send({ 
                embeds: [exampleEmbed3] 
            });
        }

        //複数フレーム送信4
        if ( messages_e4.length !== 0 ) {
            const exampleEmbed4 = new MessageEmbed()
                .setColor('#25b7c0')
                .setDescription(messages_e4)
        
            console.log('Embed4.length:' + exampleEmbed4.length)
            console.log('['+new Date()+'] ■■■メッセージ送信(複数4)■■■')
            channel.send({ 
                embeds: [exampleEmbed4] 
            });
        }

        //複数フレーム送信5
        if ( messages_e5.length !== 0 ) {
            const exampleEmbed5 = new MessageEmbed()
                .setColor('#25b7c0')
                .setDescription(messages_e5)
        
            console.log('Embed5.length:' + exampleEmbed5.length)
            console.log('['+new Date()+'] ■■■メッセージ送信(複数5)■■■')
            channel.send({ 
                embeds: [exampleEmbed5] 
            });
        }

        //コラム送信
        if ( colum.length !== 0 ) {
            const exampleEmbed6 = new MessageEmbed()
                .setColor('#25b7c0')
                .setDescription(colum)
                .setFooter('Cool秘書部屋より')
                .setTimestamp()
        
            console.log('Embed6.length:' + exampleEmbed6.length)
            console.log('['+new Date()+'] ■■■メッセージ送信(コラム)■■■')
            channel.send({ 
                embeds: [exampleEmbed6] 
            });
        }
    });
    cron.schedule('00 13 * * *', () => {
        messages = '';
        messages_e1 = '';
        messages_e2 = '';
        messages_e3 = '';
        messages_e4 = '';
        messages_e5 = '';
        users = '';
        colum = '';
        console.log('['+new Date()+'] ■■■メモリクリア■■■')
    });
})

client.on('messageCreate', async (message) => {
    try {
        // if it's from a bot
        if (message.author.bot) return;
        // If it's from the target person
        if (message.author.id === REMINDER_TO_MENTION_ID) {
            return
        }
        console.log('Debug:001');
        
        if ( checkMessage(message) && message.reference == null) {
            let author = message.author;
            // let username = '<@' + author.id + '>';
            // let username = `<@!${author.id}>`;
            let username = author.username;
            let result = users.indexOf( username );
            console.log('result:' + result)
            if (result == -1) {
                users = users + '\n' + username
                console.log('user add')
            }
            let str = message.content.replace('<@1033544892976209930>', '\n');
            console.log('--------------------------');
            console.log('str.length：' + String(str).length);
            console.log('messages.length：' + messages.length);
            console.log('messages_e1.length：' + messages_e1.length);
            console.log('messages_e2.length：' + messages_e2.length);
            console.log('colum.length：' + colum.length);
            console.log('Debug:002');

            if ( str.match(/本日のコラム/)) {
                colum = str;
                console.log('['+new Date()+'] ■■■コラム登録■■■');
                console.log('Debug:003');
                //console.log(colum)
                message.react(REACT_EMOJI);
            } else if ( messages.length + String(str).length < 3000 ) {
                messages = messages + '\n' + str;
                console.log('['+new Date()+'] ■■■メッセージ登録(単一)■■■');
                console.log('message.length(登録後):' + messages.length);
                //console.log(messages);
                message.react(REACT_EMOJI);
            } else if ( messages_e1.length + String(str).length < 3000) {
                messages_e1 = messages_e1 + '\n' + str;
                console.log('['+new Date()+'] ■■■メッセージ登録(複数1)■■■');
                console.log('message_e1.length(登録後):' + messages_e1.length);
                //console.log(messages_e);
                message.react(REACT_EMOJI);
            } else if ( messages_e2.length + String(str).length < 3000) {
                messages_e2 = messages_e2 + '\n' + str;
                console.log('['+new Date()+'] ■■■メッセージ登録(複数2)■■■');
                console.log('message_e2.length(登録後):' + messages_e2.length);
                //console.log(messages_e);
                message.react(REACT_EMOJI);
            } else if ( messages_e3.length + String(str).length < 3000) {
                messages_e3 = messages_e3 + '\n' + str;
                console.log('['+new Date()+'] ■■■メッセージ登録(複数3)■■■');
                console.log('message_e3.length(登録後):' + messages_e3.length);
                //console.log(messages_e);
                message.react(REACT_EMOJI);
            } else if ( messages_e4.length + String(str).length < 3000) {
                messages_e4 = messages_e4 + '\n' + str;
                console.log('['+new Date()+'] ■■■メッセージ登録(複数4)■■■');
                console.log('message_e4.length(登録後):' + messages_e4.length);
                //console.log(messages_e);
                message.react(REACT_EMOJI);
            } else if ( messages_e5.length + String(str).length < 3000) {
                messages_e5 = messages_e5 + '\n' + str;
                console.log('['+new Date()+'] ■■■メッセージ登録(複数5)■■■');
                console.log('message_e5.length(登録後):' + messages_e5.length);
                //console.log(messages_e);
                message.react(REACT_EMOJI);
            } else {
                console.log('メッセージサイズオーバー');
            }
        }
    } catch (error) {
        console.error('['+new Date()+'] Catched error at somewhere :'+error);
    }
})

client.on('messageCreate', async (message) => {
    try {
        // if (!message.content.startsWith(prefix)) return
        // const [command, ...args] = message.content.slice(prefix.length).split(/\s+/)

        // if (command === 'news') {
        if (message.content === '!news') {
            let channel = client.channels.cache.get(CHANNEL_ID_S) as TextChannel;
            let date = new Date();
            let year = date.getFullYear() ;
            let month = date.getMonth()+1;
            let day = date.getDate();
            let dayOfWeek = date.getDay();
            let dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek];
            let title1 = '【Cool秘書日報】';
            let title2 = '★気になる内容のリンクを押すと詳細が見れますよ！'
            let title_day = '★日時：' + year +'/' + month + '/' + day + ' (' + dayOfWeekStr + ') 分';
            let assistant = '★本日の担当秘書↓' + users;

            console.log('message.content:' + message.content);
            console.log('message.length:' + messages.length);
            console.log('messages_e1.length:' + messages_e1.length);
            console.log('messages_e2.length:' + messages_e2.length);
            
            //単一フレーム送信
            if ( messages.length !== 0) {
                const exampleEmbed = new MessageEmbed()
                    .setColor('#25b7c0')
                    .setAuthor({ name: 'Cool秘書bot', url: 'https://twitter.com/HiruneSleeping' })
                    .setTitle(title1)
                    .setDescription(title_day + '\n' + title2 + '\n' + assistant + '\n' + messages)
            
                console.log('Embed.length:' + exampleEmbed.length)
                console.log('['+new Date()+'] ■■■メッセージ送信(単一)■■■')
                message.react(REACT_EMOJI);
                channel.send({ 
                    content: `<@&${REMINDER_ALL_MENTION_ID}> \n`,
                    embeds: [exampleEmbed] 
                });
            }

            //複数フレーム送信1
            if ( messages_e1.length !== 0 ) {
                const exampleEmbed1 = new MessageEmbed()
                    .setColor('#25b7c0')
                    .setDescription(messages_e1)
            
                console.log('Embed1.length:' + exampleEmbed1.length)
                console.log('['+new Date()+'] ■■■メッセージ送信(複数1)■■■')
                channel.send({ 
                    embeds: [exampleEmbed1] 
                });
            }

            //複数フレーム送信2
            if ( messages_e2.length !== 0 ) {
                const exampleEmbed2 = new MessageEmbed()
                    .setColor('#25b7c0')
                    .setDescription(messages_e2)
            
                console.log('Embed2.length:' + exampleEmbed2.length)
                console.log('['+new Date()+'] ■■■メッセージ送信(複数2)■■■')
                channel.send({ 
                    embeds: [exampleEmbed2] 
                });
            }

            //複数フレーム送信3
            if ( messages_e3.length !== 0 ) {
                const exampleEmbed3 = new MessageEmbed()
                    .setColor('#25b7c0')
                    .setDescription(messages_e3)
            
                console.log('Embed3.length:' + exampleEmbed3.length)
                console.log('['+new Date()+'] ■■■メッセージ送信(複数3)■■■')
                channel.send({ 
                    embeds: [exampleEmbed3] 
                });
            }

            //複数フレーム送信4
            if ( messages_e4.length !== 0 ) {
                const exampleEmbed4 = new MessageEmbed()
                    .setColor('#25b7c0')
                    .setDescription(messages_e4)
            
                console.log('Embed4.length:' + exampleEmbed4.length)
                console.log('['+new Date()+'] ■■■メッセージ送信(複数4)■■■')
                channel.send({ 
                    embeds: [exampleEmbed4] 
                });
            }

            //複数フレーム送信5
            if ( messages_e5.length !== 0 ) {
                const exampleEmbed5 = new MessageEmbed()
                    .setColor('#25b7c0')
                    .setDescription(messages_e5)
            
                console.log('Embed5.length:' + exampleEmbed5.length)
                console.log('['+new Date()+'] ■■■メッセージ送信(複数5)■■■')
                channel.send({ 
                    embeds: [exampleEmbed5] 
                });
            }

            //コラム送信
            if ( colum.length !== 0 ) {
                const exampleEmbed6 = new MessageEmbed()
                    .setColor('#25b7c0')
                    .setDescription(colum)
                    .setFooter('Cool秘書部屋より')
                    .setTimestamp()
            
                console.log('Embed6.length:' + exampleEmbed6.length)
                console.log('['+new Date()+'] ■■■メッセージ送信(コラム)■■■')
                channel.send({ 
                    embeds: [exampleEmbed6] 
                });
            }
        }
    } catch (error) {
        console.error('['+new Date()+'] Catched error at somewhere :'+error)
    }
})

client.on('messageCreate', (message) => {
    try {
        if (!message.content.startsWith(prefix)) return
        const [command, ...args] = message.content.slice(prefix.length).split(/\s+/)
        if (command === 'memclear') {
            messages = '';
            messages_e1 = '';
            messages_e2 = '';
            messages_e3 = '';
            messages_e4 = '';
            messages_e5 = '';
            users = '';
            colum = '';
            console.log('['+new Date()+'] ■■■メモリクリア■■■')
            message.react(REACT_EMOJI);
            
        }
    } catch (error) {
        console.error('['+new Date()+'] Catched error at somewhere :'+error)
    }
})

function checkMessage (message: Message): boolean {
    return REMINDER_TO_MENTION_ID !== "" && (message.content.includes(`<@${REMINDER_TO_MENTION_ID}>`))
}

client.login(process.env.TOKEN)
