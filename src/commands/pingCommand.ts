import Command  from '../command'

export default class PingCommand extends Command {
  execute() {
    this.message.reply('pong')
  }
}
