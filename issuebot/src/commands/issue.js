"use strict";
const issuebot_1 = require("../issuebot");
const discord_harmony_1 = require("discord-harmony");
const discord_harmony_2 = require("discord-harmony");
class IssueCommand extends discord_harmony_1.Command {
    execute() {
        var params = discord_harmony_2.parseArgs(this.args);
        if (!params) {
            return;
        }
        issuebot_1.default.gitHub.api.issues.create({
            owner: "LeagueSandbox",
            repo: params[0],
            title: params[1],
            body: params[2]
        }, (error, response) => this.handleGithubResponse(error, response));
    }
    handleGithubResponse(error, response) {
        if (error) {
            let formattedError = JSON.stringify(error, null, 4);
            let reply = ERROR_TEMPLATE.replace('{PLACEHOLDER}', formattedError);
            this.message.reply(reply);
        }
        let reply = SUCCESS_TEMPLATE.replace('{PLACEHOLDER}', response.html_url);
        this.message.reply(reply);
    }
}
exports.IssueCommand = IssueCommand;
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
