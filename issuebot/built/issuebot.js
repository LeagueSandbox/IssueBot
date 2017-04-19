"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require('../config.json');
const Harmony = require("discord-harmony");
const github_1 = require("./github");
const commands_1 = require("./commands");
class IssueBot extends Harmony.Bot {
    constructor() {
        super();
        this.gitHub = new github_1.GitHub(config.githubToken);
    }
    loadCommands() {
        super.loadCommands();
        this.commandManager.addCommand('issue', commands_1.IssueCommand);
    }
}
exports.IssueBot = IssueBot;
const instance = new IssueBot();
instance.start(config.discordToken);
exports.default = instance;
