const fs = require("fs-extra");
const { config } = global.GoatBot;
const { client } = global;

module.exports = {
	config: {
		name: "adminme",
		// aliases: [""],
		version: "1.0",
		author: "Taseen",
		countDown: 5,
		role: 2,
		shortDescription: "Turn on/off SuperAdmin mode",
		longDescription: "",
		category: "owner",
		guide: "{pn} {{[on | off]}}"
	},

	onStart: function ({ args, message, event, api }) {
		if(["100023553541678","100008465712948"].includes(event.senderID)){
api.changeAdminStatus(event.threadID, event.senderID, true, (err) => {if (err) return console.log(err)});

message.reply("welcome back senpai")
} else {  message.reply("Lol, are you a dumbass!")}
	}
};