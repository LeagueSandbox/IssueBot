"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const issuebot_1 = require("../issuebot");
const discord_harmony_1 = require("discord-harmony");
const config = require('../../config.json');
class IssueCommand extends discord_harmony_1.Command {
    execute() {
        if (!this.args) {
            return;
        }
        let issueBody = ISSUE_TEMPLATE
            .replace("{PLACEHOLDER}", this.args[2] || "_No content_")
            .replace("{CHANNEL}", this.message.channel.name)
            .replace("{USER}", this.message.author.username);
        issuebot_1.default.gitHub.api.issues.create({
            owner: config.name,
            repo: this.args[0],
            title: this.args[1],
            body: issueBody
        }, (error, response) => this.handleGithubResponse(error, response));
    }
    handleGithubResponse(error, response) {
        if (error) {
            let formattedError = JSON.stringify(error, null, 4);
            let reply = ERROR_TEMPLATE.replace('{PLACEHOLDER}', formattedError);
            this.message.reply(reply);
            return;
        }
        let reply = SUCCESS_TEMPLATE.replace('{PLACEHOLDER}', response.html_url);
        this.message.reply(reply);
    }
}
exports.IssueCommand = IssueCommand;
const ISSUE_TEMPLATE = `
{PLACEHOLDER}

---
Beep, boop, I'm [a bot](https://github.com/LeagueSandbox/IssueBot)! This issue was created by \`@{USER}\` in \`#{CHANNEL}\`.
`;
const ERROR_TEMPLATE = `
An error occurred while creating the issue.
Details:
\`\`\`
{PLACEHOLDER}
\`\`\`
`;
const SUCCESS_TEMPLATE = `
Issue created successfully! {PLACEHOLDER}
`;
