"use strict";
const config = require('./config.json');
const Discord = require("discord.js");
const commandManager_1 = require("./src/commandManager");
const github_1 = require("./src/github");
const issueCommand_1 = require("./src/commands/issueCommand");
class Bot {
    constructor() {
        this.client = new Discord.Client();
        this.commandManager = new commandManager_1.default();
        this.gitHub = new github_1.default(config.githubToken);
    }
    start() {
        this.client.on('ready', () => console.log('Bot ready'));
        this.client.on('message', message => this.commandManager.processMessage(message));
        this.client.login(config.discordToken);
    }
    loadCommands() {
        console.log('Loading commands...');
        this.commandManager.addCommand('issue', issueCommand_1.default);
    }
}
const instance = new Bot();
instance.loadCommands();
instance.start();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = instance;
