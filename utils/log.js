const chalk = require('chalk');
const colors = ['red', 'yellow', 'blue', 'magenta', 'cyan', 'green', 'magentaBright'];
module.exports = (data, option) => {
  switch (option) {
    case "warn":
      console.log(chalk.yellow(' ❕   ') + data);
      break;
    case "error":
      console.log(chalk.red(' ❕   ') + data);
      break;
    default:
      console.log(chalk[colors[Math.floor(Math.random() * colors.length)]](`${option}  `) + chalk[colors[Math.floor(Math.random() * colors.length)]](data));
      break;
  }
}

module.exports.loader = (data, option) => {
  switch (option) {
    case "warn":
      console.log(chalk.yellow('[ 𝗨𝗡𝗞𝗡𝗢𝗪𝗡 ] ➤') + data);
      break;
    case "error":
      console.log(chalk.red('[ 𝗘𝗥𝗥𝗢𝗥 𝗦𝗬𝗦𝗧𝗘𝗠 ] ➤') + data);
      break;
    default:
      console.log(chalk[colors[Math.floor(Math.random() * colors.length)]](`[ 𝗦𝗬𝗦𝗧𝗘𝗠 ] ➤`) + chalk[colors[Math.floor(Math.random() * colors.length)]](data));
      break;
  }
}
