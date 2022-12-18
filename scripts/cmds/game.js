module.exports = {
	config: {
		name: "game",
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
		category: "",
		guide: "",
		
	},

onStart: async function ({ event, message, api, usersData, args}) {
  const mention = Object.keys(event.mentions);

  if(args[0] == "close") {
if(!global.game.hasOwnProperty(event.threadID) || global.game[event.threadID].on == false ){ message.reply("There is no game running in this group")
  } else {
if(event.senderID == global.game[event.threadID].player1.id || event.senderID == global.game[event.threadID].player2.id ){
  if(event.senderID == global.game[event.threadID].player1.id){
    message.reply({body:`What a cry baby. ${global.game[event.threadID].player1.name} left the game.\nWinner is ${global.game[event.threadID].player2.name}.`, mentions: [{
                        tag: global.game[event.threadID].player1.name,
                        id: global.game[event.threadID].player1.id,
        
                      }, {
                        tag: global.game[event.threadID].player2.name,
                        id: global.game[event.threadID].player2.id,
        
                      }]
        
        
                    })
  } else {
    message.reply({body:`What a cry baby. ${global.game[event.threadID].player2.name} left the game.\nWinner is ${global.game[event.threadID].player1.name}.`, mentions: [{
                        tag: global.game[event.threadID].player1.name,
                        id: global.game[event.threadID].player1.id,
        
                      }, {
                        tag: global.game[event.threadID].player2.name,
                        id: global.game[event.threadID].player2.id,
        
                      }]
        
        
                    })
  }
  global.game[event.threadID].on = false
} else{
 message.reply("You don’t have any game running in this group")
}



  
  }

    
  } else{
    
  
      if(mention.length == 0) return message.reply("Please mention someone or say game close to close any existing game");
  if(!global.game.hasOwnProperty(event.threadID) || global.game[event.threadID].on == false ){
    global.game[event.threadID] = {
      on:true,
  board:"🔲🔲🔲\n🔲🔲🔲\n🔲🔲🔲", 
      bid:"",
      board2:"123456789",
      avcell: ["1", "2","3","4","5","6","7","8","9"],
      turn: mention[0],
      player1: {id:mention[0],name:await usersData.getName(mention[0])},
      player2: {id:event.senderID, name: await usersData.getName(event.senderID)},
      bidd:"❌",
      bid:"",
      ttrns: [],
      counting:0
    }
    message.send(global.game[event.threadID].board, (err, info) =>{global.game[event.threadID].bid = info.messageID;
            global.fff.push(info.messageID)                                                      })
    }else{message.reply(" A game is already on this group")}
    
                          }

},
  onChat: async function ({ event, message, api, args}){
if(event.type == "message_reply" && global.game[event.threadID] && global.game[event.threadID].on == true){

if(event.messageReply.messageID === global.game[event.threadID].bid){
  console.log("bal")
if(global.game[event.threadID].turn === event.senderID){
  console.log("sal")
  if(["1", "2","3","4","5","6","7","8","9"].includes(event.body)){
if(global.game[event.threadID].avcell.includes(event.body)){
global.game[event.threadID].avcell.splice(global.game[event.threadID].avcell.indexOf(event.body), 1)

let input2 = event.body*2

global.game[event.threadID].ttrns.map(e => {
	if(e<event.body){
		input2--
	}
})

if(["4", "5", "6"].includes(event.body)){
	input2++
} else if(["7", "8", "9"].includes(event.body)){
	input2 += 2
}

global.game[event.threadID].board = global.game[event.threadID].board.replaceAt("🔲", global.game[event.threadID].bidd, input2-2)
global.game[event.threadID].board2 = global.game[event.threadID].board2.replace(event.body, global.game[event.threadID].bidd)
  
message.send(global.game[event.threadID].board, (err, infos) => {global.game[event.threadID].bid = infos.messageID
            global.fff.push(infos.messageID)}
            )
  //ttrns.push(ear.body)

  if(
 (global.game[event.threadID].board2[0] === global.game[event.threadID].bidd && global.game[event.threadID].board2[1] === global.game[event.threadID].bidd && global.game[event.threadID].board2[2] === global.game[event.threadID].bidd ) || ( global.game[event.threadID].board2[3] === global.game[event.threadID].bidd && global.game[event.threadID].board2[4] === global.game[event.threadID].bidd && global.game[event.threadID].board2[5] === global.game[event.threadID].bidd ) || ( global.game[event.threadID].board2[6] === global.game[event.threadID].bidd && global.game[event.threadID].board2[7] === global.game[event.threadID].bidd && global.game[event.threadID].board2[8] === global.game[event.threadID].bidd ) || ( global.game[event.threadID].board2[0] === global.game[event.threadID].bidd && global.game[event.threadID].board2[3] === global.game[event.threadID].bidd && global.game[event.threadID].board2[6] === global.game[event.threadID].bidd ) || ( global.game[event.threadID].board2[1] === global.game[event.threadID].bidd && global.game[event.threadID].board2[4] === global.game[event.threadID].bidd && global.game[event.threadID].board2[7] === global.game[event.threadID].bidd ) || ( global.game[event.threadID].board2[2] === global.game[event.threadID].bidd && global.game[event.threadID].board2[5] === global.game[event.threadID].bidd && global.game[event.threadID].board2[8] === global.game[event.threadID].bidd ) || ( global.game[event.threadID].board2[0] === global.game[event.threadID].bidd && global.game[event.threadID].board2[4] === global.game[event.threadID].bidd && global.game[event.threadID].board2[8] === global.game[event.threadID].bidd ) || ( global.game[event.threadID].board2[2] === global.game[event.threadID].bidd && global.game[event.threadID].board2[4] === global.game[event.threadID].bidd && global.game[event.threadID].board2[6] === global.game[event.threadID].bidd) ){
    if(global.game[event.threadID].turn === global.game[event.threadID].player1.id){
      setTimeout(function(){message.send({body:`${global.game[event.threadID].player1.name} বিজয়ী হয়েছেন`, mentions: [{
                        tag: global.game[event.threadID].player1.name,
                        id: global.game[event.threadID].player1.id,
        
                      }]
        
        
                    })
    }, 1000)} else {setTimeout(function(){message.send({body:`${global.game[event.threadID].player2.name} বিজয়ী হয়েছেন`, mentions: [{
                        tag: global.game[event.threadID].player2.name,
                        id: global.game[event.threadID].player2.id,
        
                      }]
        
        
                    })}, 1000)}
   global.game[event.threadID].on = false
}else if(global.game[event.threadID].counting === 8){
  setTimeout(function (){message.send("আর কোনো দান বাকি নেই। এই ম্যাচ এ কেউ জিততে পারেনি")}, 1000)
  global.game[event.threadID].on = false
} else{
  global.game[event.threadID].counting +=1
  message.unsend(event.messageReply.messageID)
    global.game[event.threadID].ttrns.push(event.body)
  if(global.game[event.threadID].turn === global.game[event.threadID].player1.id){
   // console.log(player2.id)
   global.game[event.threadID]. turn = global.game[event.threadID].player2.id
   // console.log(turn)
    global.game[event.threadID].bidd = "⭕"
  } else{
    global.game[event.threadID].turn = global.game[event.threadID].player1.id
    global.game[event.threadID].bidd = "❌"
  }
}


  
} else{message.reply("এই ঘরটি খালি নেই")}

} else{message.reply("শুধুমাত্র 1 থেকে 9 সংখ্যাগুলোই রিপ্লাই দিতে পারবেন")}
} else{message.reply("আপনার দান নয়") }


}


  
}
  }
};

  String.prototype.replaceAt = function (search, replace, from) { if (this.length > from) { return this.slice(0, from) + this.slice(from).replace(search, replace); } return this; }