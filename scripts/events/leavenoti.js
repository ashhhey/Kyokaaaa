module.exports.config = {
	name: "leave",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "MrTomXxX",//Mod by H.Thanh
	description: "Notify the Bot or the person leaving the group with a random gif/photo/video",
	dependencies: {
		"fs-extra": "",
		"path": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "leaveGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "leaveGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}

module.exports.run = async function({ api, event, Users, Threads }) {
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
	const { join } =  global.nodemodule["path"];
	const { threadID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Manila").format("DD/MM/YYYY || HH:mm:s");
  const hours = moment.tz("Asia/Manila").format("HH");
	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
	const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
	const type = (event.author == event.logMessageData.leftParticipantFbId) ? "leave" : "managed";
	const path = join(__dirname, "cache", "leaveGif");
	const pathGif = join(path, `${threadID}.mp4`);
	var msg, formPush

	if (existsSync(path)) mkdirSync(path, { recursive: true });

(typeof data.customLeave == "undefined") ? msg = "[👋] {name} 𝗗𝗲𝗽𝗮𝗿𝘁𝗲𝗱 𝗳𝗿𝗼𝗺 𝘂𝘀. [👋]\n━━━━━━━━━⚄━━━━━━━━━\n 𝗧𝗵𝗮𝗻𝗸𝘀 𝗕𝗿𝗼𝘁𝗵𝗲𝗿 {name} 𝗜 𝘄𝗶𝘀𝗵, 𝘆𝗼𝘂 𝗲𝗻𝗷𝗼𝘆 𝗷𝗼𝗶𝗻𝗶𝗻𝗴 𝗶𝗻 𝘁𝗵𝗶𝘀 𝗴𝗿𝗼𝘂𝗽 𝗯𝘁𝘄 𝗚𝗼𝗼𝗱𝗯𝘆𝗲  𝗮𝗻𝗱 𝗦𝗲𝗲 𝘆𝗼𝘂 𝗡𝗲𝘅𝘁 𝘁𝗶𝗺𝗲 𝗕𝗿𝗼𝘁𝗵𝗲𝗿 {name} \n[👋] 𝗚𝗼𝗼𝗱 {session} || {time}" : msg = data.customLeave;
	msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type).replace(/\{session}/g, hours <= 10 ? "𝗠𝗼𝗿𝗻𝗶𝗻𝗴" : 
    hours > 10 && hours <= 12 ? "𝗔𝗳𝘁𝗲𝗿𝗻𝗼𝗼𝗻" :
    hours > 12 && hours <= 18 ? "𝗘𝘃𝗲𝗻𝗶𝗻𝗴" : "𝗡𝗶𝗴𝗵𝘁").replace(/\{time}/g, time);  

	const randomPath = readdirSync(join(__dirname, "cache", "leaveGif", "randomgif"));

	if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif) }
	else if (randomPath.length != 0) {
		const pathRandom = join(__dirname, "cache", "leaveGif", "randomgif",`${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
		formPush = { body: msg, attachment: createReadStream(pathRandom) }
	}
	else formPush = { body: msg }
	
	return api.sendMessage(formPush, threadID);
}