const axios = require('axios');

module.exports = {
	config: {
		name: "ss",
		aliases: ["ss"],
		version: "1.0",
		author: "@tas33n",
		countDown: 5,
		role: 0,
		shortDescription: "get screen short from an url",
		longDescription: "get screen short from an url",
		category: "Entertainment",
		guide: "{pn} {{<name>}}"
	},

	onStart: async function ({ message, args }) {
		const name = args.join(" ");
		if (!name)
			return message.reply(`⚠️ | Please enter an url!`);
		else {
			const BASE_URL = `http://itsprodev.cf/facebook/screenshort.php?url=${name}`;
			try {
				let res = await axios.get(BASE_URL)
				let res2 = res.data
				let img = res2.url
				const form = {
					body: ``
				};
				if (img)
					form.attachment = await global.utils.getStreamFromURL(img);
				message.reply(form);
			} catch (e) { message.reply(`🥺 Not Found`) }

		}
	}
};
