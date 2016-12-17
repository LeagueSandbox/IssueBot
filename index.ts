const config = require('./config.json')
import Discord = require('discord.js')

import CommandManager from './src/commandManager'
import GitHub from './src/github'

import PingCommand from './src/commands/pingCommand'
import IssueCommand from './src/commands/issueCommand'

class Bot {
  client: any
  commandManager: CommandManager
  gitHub: GitHub

  constructor() {
    this.client = new Discord.Client()
    this.commandManager = new CommandManager()
    this.gitHub = new GitHub(config.githubToken)
  }

  start() {
    this.client.on('ready', () => console.log('Bot ready'))
    this.client.on('message', message => this.commandManager.processMessage(message))
    this.client.login(config.discordToken)
  }

  loadCommands() {
    console.log('Loading commands...')
    // this.commandManager.addCommand('ping', PingCommand)
    this.commandManager.addCommand('issue', IssueCommand)
  }
}

const instance = new Bot()
instance.loadCommands()
instance.start()

export default instance as Bot
