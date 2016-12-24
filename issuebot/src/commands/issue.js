"use strict";
const issuebot_1 = require("../issuebot");
const discord_harmony_1 = require("discord-harmony");
class IssueCommand extends discord_harmony_1.Command {
    execute() {
        if (!this.args) {
            return;
        }
        issuebot_1.default.gitHub.api.issues.create({
            owner: "LeagueSandbox",
            repo: this.args[0],
            title: this.args[1],
            body: this.args[2]
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
