"use strict";
const COMMAND_IDENTIFIER = '!';
class CommandManager {
    constructor() {
        this.commands = [];
    }
    processMessage(message) {
        if (!message.content.startsWith(COMMAND_IDENTIFIER)) {
            return;
        }
        var content = message.content.slice(COMMAND_IDENTIFIER.length);
        if (content.length < 1) {
            return;
        }
        var name = content.split(' ')[0];
        if (!(name in this.commands)) {
            return;
        }
        var commandClass = this.commands[name];
        var args = content.slice(name.length);
        var instance = new commandClass(message, args);
        instance.execute();
    }
    addCommand(name, cls) {
        if (name in this.commands) {
            throw new Error('Command with this name already exists');
        }
        this.commands[name] = cls;
        console.log(`Mapped ${cls.name} to !${name}`);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommandManager;
