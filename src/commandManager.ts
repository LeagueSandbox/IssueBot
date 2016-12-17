import Command from './command'

const COMMAND_IDENTIFIER = '!'

export default class CommandManager {
  private commands: Array<Function>

  constructor() {
    this.commands = []
  }

  processMessage(message) {
    if(!message.content.startsWith(COMMAND_IDENTIFIER)) {
      return
    }

    var content = <string>message.content.slice(COMMAND_IDENTIFIER.length)
    if(content.length < 1) {
      return
    }

    var name = content.split(' ')[0]
    if(!(name in this.commands)) {
      return
    }

    var commandClass = this.commands[name]
    var args = content.slice(name.length)
    var instance: Command = new commandClass(message, args)
    instance.execute()
  }

  addCommand(name: string, cls: any) {
    if(name in this.commands) {
      throw new Error('Command with this name already exists')
    }
    this.commands[name] = cls
    console.log(`Mapped ${cls.name} to !${name}`)
  }
}
