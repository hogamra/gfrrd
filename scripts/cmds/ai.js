const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);


module.exports = {
	config: {
		name: "ai",
		version: "1.1",
		author: "NIB",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: ""
		},
		longDescription: {
			vi: "",
			en: ""
		},
		category: "Ai ChatBots",
		guide: "",
		
	},

onStart: async function ({ event, message, getLang, usersData, api, args}) {

let completion = await openai.createCompletion({
  model: "text-davinci-002",
  prompt: args.join(" "),
  temperature: 0.7,
  max_tokens: 500,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
   })
  //console.log(completion.data)
message.reply(completion.data.choices[0].text);
  
}
  }