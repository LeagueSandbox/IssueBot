"use strict";
const issuebot_1 = require("../../issuebot");
const command_1 = require("../command");
const utils_1 = require("../utils");
class IssueCommand extends command_1.default {
    execute() {
        var params = utils_1.default(this.args, 3);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IssueCommand;
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
