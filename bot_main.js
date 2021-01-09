const Discord = require('discord.js')
const client = new Discord.Client()
const fetch = require('node-fetch')
client.on("ready",function(){
    console.log("connected as "+client.user.tag);
    client.user.setActivity(" anime with varun",{type:"WATCHING"});

    client.guilds.cache.forEach(guild =>{
        console.log(guild.name);
        guild.channels.cache.forEach(channel=>{
            console.log(`- ${channel.name} ${channel.type} ${channel.id}`);
        })
    })
    let genCh = client.channels.cache.get("796000796830335009");
    // const attachment = new Discord.MessageAttachment("https://cc-prod.scene7.com/is/image/CCProdAuthor/Chibi-characters_P3_720x1002?$pjpeg$&jpegSize=200&wid=720"); //give url of image or file here
    // genCh.send("hey",attachment);

})
client.on("message",function(msg){
    if(msg.author==client.user) return;
    //msg.channel.send("kaa re " + msg.author.toString()+"\nkaisa hai");
    //msg.channel.send(msg.author.toString()+" said = "+msg.content+"🖕");
    if(msg.content.startsWith("vk")){
        processCommand(msg);
    }

})
function processCommand(msg) {
    var command = msg.content.substr(2);
    var splitcommand = command.split(" ");
    console.log(splitcommand);
    // splitcommand.forEach(cmd=>{
    //     msg.channel.send(cmd+"\n");
    // })
    var maincommand = splitcommand[1];
    var args = splitcommand.slice(1);
    console.log("args = "+args+" length = "+args.length);
    if(args.length==0){
        msg.channel.send("please use commands like this : `vk [command]`");
        msg.channel.send("Set of commands : \n1. `help`\n2. `joke`\n3. `add n1 n2 ...nN`\n")
    }
    // check all commands here
    // msg.channel.send("your main command is = "+maincommand+" and arguments are = "+args);
    else{
        analyzeCommand(msg,args);
    }
}
function analyzeCommand(msg,args){
    // msg.channel.send("your command is = "+ args);
    var command = args[0];
    if(args[0]=="help"){
        msg.channel.send("what do u need help with?");
    }
    else if(args[0]=="joke"){
        // msg.channel.send("i dont know any jokes..");
        jokes(msg);
    }
    else if(command == "add"){
        addcommand(args.slice(1),msg);
    }
    else if(args[0] == "random" && args[1]=="song"){
        getSong(msg);
    }
    else{
        msg.channel.send(command+" is not a valid command.")
    }
}
function getSong(msg){
    //msg.channel.send("song link fail ; ");
    
    var songsdb=["PK8HQmHEvwM","TDHQaq3D5vU","9VNI3s7rUoQ"];
    var value = Math.floor(Math.random()*songsdb.length);
    msg.channel.send("https://www.youtube.com/watch?v="+songsdb[value]);
}
function jokes(msg){
    let url = "https://official-joke-api.appspot.com/random_joke";
    fetch(url).then(response=>response.json()).then(outputjoke=>{
        console.log(outputjoke);
        msg.channel.send(outputjoke.setup);
        msg.channel.send(outputjoke.punchline);
    })
}
function addcommand(numbers,msg){
    if(numbers.length<2){
        msg.channel.send("not enough numbers to add..");
        return;
    }
    var sum=0;
    numbers.forEach(num=>{
        sum+=parseInt(num);
    })
    msg.channel.send("Sum = "+sum);
}
// general text 796000796830335009

client.login("Nzk2MDAxMDIxOTA1NjAwNTEy.X_RjuA.GjfadZHf0E54MW5PQmLVgktMKMY")