const Discord = require("discord.js"); //discord.js node module
const { on } = require("events");

// contains string of discord bot token
const { token } = require("./config.json");

// Gateway Intents were introduced by Discord so bot devs can choose which events their bot receives based on
// which data it needs to function, with partials we will be able to receive the full data of the objects returned from each event.

const Client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.Guilds
    ], partials: [
        Discord.Partials.Message,
        Discord.Partials.Channel,
        Discord.Partials.GuildMember,
        Discord.Partials.User,
        Discord.Partials.GuildScheduledEvent,
        Discord.Partials.ThreadMember
    ]
}); // Creating a new client with intens and partials needed for the bot to function
// Partials makes sure that we receive the full data of the object returned from events.

// Ready event captures the state when the bot gets online.
Client.on("ready", (client) => {
    console.log("Bot is now online: " + client.user.tag);
});

// messagecreate event captures data of a message that is created or posted
Client.on("messageCreate", (message) =>{

    // converts all unput text to lowercase, bot can only read lowercase
    const userInputText = message.content.toLowerCase();

    // only allows non bots to make code executions
    if (message.author.bot) { return }
        console.log(message.author.username + " wrote a message!");

    // if (!message.author.bot){
    //     message.reply("Hello there! You are not a bot!");
    // } 
    if (userInputText == "!commands" || userInputText == "!help"){
        message.reply("This bot operates with the following commands: !help !commands !age");
    }

    // finds server age and users age in server
    if (userInputText == "!age"){
        console.log(message.guild.createdTimestamp);
        console.log(message.guild.createdAt);
        console.log(new Date(message.guild.createdTimestamp).toString());

        message.reply("Server was created " + message.guild.createdAt.toString());
    }

    if (userInputText == "!users"){
        message.guild.members.fetch().then(
    (members) => {
        let replyMessage = "Users and their join dates:\n";
        members.forEach(member => {
            console.log("User ID " + member.user.id);
            console.log(member.joinedAt);
            let date = new Date(member.joinedAt);
            replyMessage += `${member.user.tag} joined ${date.toString()}\n`;
        });
        message.reply(replyMessage);
    },
    (error) => {
        console.log(error);
    }
);
    }
});

Client.login(token);
