const axios = require("axios");

const dictionaryStatus = {
  enabled: true,
};

module.exports.config = {
    name: "dictionary",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Prince Sanel",
    description: "Definition of a word",
    usePrefix: true,
    commandCategory: "Search",
    usages: "[Word]",
    cooldowns: 0,
}; // Credits for api: Sensui

module.exports.run = async function({ api, event, args }) {
  if (args[0] === 'off' && event.senderID === '100092359574131') {

    dictionaryStatus.enabled = false;
    return api.sendMessage('DICTIONARY BOT IS OFF📚', event.threadID, event.messageID);

  } else if (args[0] === 'on' && event.senderID === '100092359574131') {

    dictionaryStatus.enabled = true;
    return api.sendMessage('DICTIONARY CMD IS NOW ON📖', event.threadID, event.messageID);
  }

  if (!dictionaryStatus.enabled) {
    return api.sendMessage('DICTIONARY CMD IS CURRENTLY OFF BY ADMINS❌', event.threadID, event.messageID);
  }

  const prompt = args.join(' ');
  api.setMessageReaction("⏱️", event.messageID, () => {}, true);

  var { threadID, messageID } = event;
  try {
    const req = args[0];
    if (!args[0]) return api.sendMessage("[!] Require an word to fetch the meaning", threadID, messageID);
    const res = await axios(`https://sensui-useless-apis.codersensui.repl.co/api/tools/dictionary?word=${encodeURI(req)}`);
    api.sendMessage(`»» DICTIONARY API ««\n❯ Word: ${res.data.word}\n❯ Definition: ${res.data.definition}\n❯ Examples: ${res.data.examples}. [DONE]`, threadID, messageID);
  } catch (error) {
    api.sendMessage("An error occurred while fetching the api", threadID, messageID);
  }
    }