
const fs = require("fs-extra")
const axios = require("axios")
module.exports = {
	config: {
		name: "pin",
		version: "1.1",
		author: "Nib",
		countDown: 30,
		role: 0,
		shortDescription: {
			en: "Search n get photos from Pinterest"
		},
		category: "image",
	},
	onStart: async function ({ api, message, event, args, getLang }) 
  {
    
    const keySearch = args.join(" ");
    if(keySearch.includes("-") == false) return api.sendMessage('Please enter in the format, example: pin Naruto -9', event.threadID, event.messageID)
    const keySearchs = keySearch.substr(0, keySearch.indexOf('-'))
    let numberSearch = keySearch.split("-").pop() || 6
    if(numberSearch>9){
      numberSearch = 9
    }
    const res = await axios.get(`https://api-dien.senthanh20055.repl.co/pinterest?search=${encodeURIComponent(keySearchs)}`);
    const data = res.data.data;
    var num = 0;
    var imgData = [];
    for (var i = 0; i < parseInt(numberSearch); i++) {
      let path = __dirname + `/tmp/${num+=1}.jpg`;
      let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
      imgData.push(fs.createReadStream(__dirname + `/tmp/${num}.jpg`));
    }
    api.sendMessage({
        attachment: imgData,
        body: numberSearch + ' Search results for keyword: '+ keySearchs
    }, event.threadID, event.messageID)
    for (let ii = 1; ii < parseInt(numberSearch); ii++) {
        fs.unlinkSync(__dirname + `/tmp/${ii}.jpg`)
    }
}
  
};