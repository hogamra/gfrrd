

module.exports = {
	config: {
		name: "antiout",
		version: "1.0",
		author: "@tas33n",
		countDown: 1,
		role: 0,
		shortDescription: "Enable/disable antiout",
		longDescription: "",
		category: "box chat",
		guide: "{pn} {{[on | off]}}",
		envConfig: {
			deltaNext: 5
		}
	},
  

	onStart: async function ({ message, event, threadsData, args }) {
let antiout = await threadsData.get(event.threadID, "settings.antiOut");
		
			
    if(antiout === undefined){
      await threadsData.set(event.threadID, true, "settings.antiOut");
    }
		if (!["on", "off"].includes(args[0]))
			return message.reply("on or off")
		await threadsData.set(event.threadID, args[0] === "on", "settings.antiOut");
    
		return message.reply(`Antiout mode ${args[0] === "on" ? "turned on" : "Turned off"}`);
	}



  
}