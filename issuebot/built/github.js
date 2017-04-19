"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GitHubApi = require("github");
class GitHub {
    constructor(token) {
        this.api = new GitHubApi();
        this.api.authenticate({
            type: "oauth",
            token: token
        });
    }
    submitIssue(owner, repo, title, description) {
        return this.api.issues.create({
            owner: owner,
            repo: repo,
            title: title,
            body: description
        });
    }
}
exports.GitHub = GitHub;
