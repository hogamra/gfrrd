const axios = require('axios');

module.exports = {
	config: {
		name: 'chika',
		aliases: ['heda', 'rose'],
		version: '1.1',
		author: 'Tas33n',
		countDown: 3,
		role: 0,
		shortDescription: 'good Chika',
		longDescription: 'Chat and get noty with good chika',
		category: 'Ai ChatBots',
		guide: {
			body: '   {pn} {{[on | off]}}: bật/tắt simsimi'
				+ '\n'
				+ '\n   {pn} {{<word>}}: chat nhanh với simsimi'
				+ '\n   Ví dụ: {pn} {{hi}}'
		}
	},

	onStart: async function ({ args, threadsData, message, event }) {
		if (args[0] == 'on' || args[0] == 'off') {
			await threadsData.set(event.threadID, args[0] == "on", "settings.simsimi");
			return message.reply(`Đã ${args[0] == "on" ? "bật" : "tắt"} simsimi trong nhóm bạn`);
		}
		else if (args[0]) {
			const yourMessage = args.join(" ");
			try {
				const responseMessage = await getMessage(yourMessage);
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
				return message.reply("Baka");
			}
		}
	},

	onChat: async ({ args, message, threadsData, event, isUserCallCommand }) => {

		if (event.type == "message_reply") {
			if (args.length > 1 && !isUserCallCommand && await threadsData.get(event.threadID, "settings.simsimi")) {
				try {
					const responseMessage = await getMessage(args.join(" "));
					return message.reply(`${responseMessage}`);
				}
				catch (err) {
					return message.reply("I am sleeping");
				}
			}

    }
	}
};

async function getMessage(yourMessage) {
	const res = await axios.get(`https://api.simsimi.net/v2`, {
		params: {
			text: yourMessage,
			lc: global.GoatBot.config.language == 'vi' ? 'hi' : 'en',
			cf: false
		}
	});

	if (res.status > 200)
		throw new Error(res.data.success);

	return res.data.success;
}



