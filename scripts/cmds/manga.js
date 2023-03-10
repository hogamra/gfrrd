const axios = require('axios');

module.exports = {
	config: {
		name: "manga",
		aliases: ["manga"],
		version: "1.0",
		author: "@tas33n",
		countDown: 5,
		role: 0,
		shortDescription: "get manga data",
		longDescription: "search and get manga infos",
		category: "anime",
		guide: "{pn} {{<name>}}"
	},

	onStart: async function ({ message, args }) {
		const name = args.join(" ");
		if (!name)
			return message.reply(`ā ļø | Please enter character name!`);
		else {
			const BASE_URL = `https://api.safone.me/anime/manga/search?query=${name}`;
			try {
				let res = await axios.get(BASE_URL)


				let res2 = res.data

				let titl = res2.title.english + " " + res2.title.native
				let statu = res2.status
				let dura = res2.duration
				let episode = res2.episodes
				let startDat = res2.startDate.day + "/" + res2.startDate.month + "/" + res2.startDate.year
				let endDat = res2.endDate.day + "/" + res2.endDate.month + "/" + res2.endDate.year
				let genre = res2.genres
				let studio = res2.studios
				let score = res2.averageScore
				let desc = res2.description
				let typ = res2.type
				let img = res2.imageUrl

				const form = {
					body: `===ć Manga Info ć===`
						+ `\n\nš° Name: ${titl}`
						+ `\n\nā»ļø Status: ${statu}`
						+ `\nš Types: ${typ}`
						+ `\nā Episode: ${episode}`
						+ `\nš Duration: ${dura}`
						+ `\nā­ Score: ${score}`
						+ `\nš Started: ${startDat}`
						+ `\nš Ended: ${endDat}`
						+ `\n\nš¾ Genres: ${genre}`
						+ `\n\nšŗ Studios: ${studio}`
						+ `\n\nš Description: ${desc}`

				};
				if (img)
					form.attachment = await global.utils.getStreamFromURL(img);
				message.reply(form);
			} catch (e) { message.reply(`š„ŗ Not Found`) }

		}
	}
};