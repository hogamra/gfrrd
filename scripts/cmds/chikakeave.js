const fs = require("fs-extra");
const { config } = global.GoatBot;
const { client } = global;

module.exports = {
	config: {
		name: "chikaleave",
		 aliases: ["bye"],
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
      api.removeUserFromGroup(api.getCurrentUserID(), event.threadID)
	}
};