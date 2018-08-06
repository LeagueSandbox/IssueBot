# IssueBot

A Discord bot for creating GitHub issues.

## Install Instructions

**Note:** Due to [NPM package linking](https://docs.npmjs.com/cli/link) requiring root access on system-wide NPM installations, it's recommended to use [NVM](https://github.com/creationix/nvm). 

Clone the repository:

```bash
$ git clone --recursive https://github.com/LeagueSandbox/IssueBot.git
$ cd IssueBot/issuebot
```

Install dependencies:

```bash
$ npm install
```

Now create a Discord application and an associated bot. Write down the Bot token, since you will need it in a bit.

Next, create a personal access token on GitHub with the `public_repo` permission. Also write down this token.

Add the Discord bot to your Discord server you want to use this functionality on.

**Note:** How to do the above three steps is out of the scope of this project README. A quick Google to the right documentation should help you with this.

Go to your project and create the configuration file.

```bash
$ cp config.json.template config.json
```

Edit `config.json` and insert your Discord token, GitHub token and your GitHub user/organization name.

**Note:** The user/organization name needs to be from the same account of which you generated the personal access token for.  

Run the bot:

```bash
$ npm start
```

You should see the following output:

```
user@system:~/IssueBot/issuebot$ npm start

> issuebot@0.1.0 start /home/user/IssueBot/issuebot
> tsc -p . && node built/issuebot.js

Loading commands...
Mapped Function to !issue
Bot ready
```

Your bot should now be online in your Discord.

## Usage

To use it, type the following in Discord where the bot can read it:

```
!issue REPO "title" "body"
```

Replace REPO with the repository you have access to. A new GitHub issue should be created through the bot.
