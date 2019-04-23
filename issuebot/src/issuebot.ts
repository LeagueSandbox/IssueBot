import * as Harmony from 'discord-harmony'
import { GitHub } from './github'
import { IssueCommand } from './commands'
import { config } from './config'

export class IssueBot extends Harmony.Bot {
  gitHub: GitHub

  constructor() {
    super()
    this.gitHub = new GitHub(config.githubToken)
  }

  loadCommands() {
    super.loadCommands()
    this.commandManager.addCommand('issue', IssueCommand)
  }
}

const instance = new IssueBot()
instance.start(config.discordToken)
export default instance as IssueBot
