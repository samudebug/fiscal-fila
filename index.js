const Discord = require('discord.js');
const client = new Discord.Client();
const Queue = require('./queue');

client.once('ready', () => {
    console.log('Ready!');
});

client.login(process.env.TOKEN);

const currentQueue = new Queue();
client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.channelID === null && newState.channelID) {
        let oldName = '';
        let hasNickname = false;
        console.log(`New User connected: ${newState.member.user.username}`);
        if (newState.member.nickname !== null) {
            oldName = newState.member.nickname;
            hasNickname = true;
        } else {
            oldName = newState.member.user.username;
        }
        const queueElement = {
            member: newState.member,
            hasNickname: hasNickname,
            oldName: oldName
        }
        currentQueue.enqueue(queueElement);
    } else if (oldState.channelID && newState.channelID || oldState.channelID && newState.channelID === null) {
        console.log('User disconected');
        currentQueue.remove(newState.member.id);
        
    }
})