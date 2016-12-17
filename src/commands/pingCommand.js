"use strict";
const command_1 = require("../command");
class PingCommand extends command_1.default {
    execute() {
        this.message.reply('pong');
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PingCommand;
