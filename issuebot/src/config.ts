
let conf;

try {
    conf = require('../config.json')
}
catch (e) {
    conf = {
        githubToken: process.env.GITHUB_TOKEN,
        githubName: process.env.GITHUB_NAME,
        discordToken: process.env.DISCORD_TOKEN,
    }
}

export const config = conf;
