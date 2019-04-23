import Bot from '../issuebot'
import { Command }  from 'discord-harmony'
import { config } from '../config'

export class IssueCommand extends Command {
  execute() {
    if(!this.args) {
      return
    }
    let issueBody = ISSUE_TEMPLATE
      .replace("{PLACEHOLDER}", this.args[2] || "_No content_")
      .replace("{CHANNEL}", this.message.channel.name)
      .replace("{USER}", this.message.author.username)
    Bot.gitHub.api.issues.create({
        owner: config.githubName,
        repo: this.args[0],
        title: this.args[1],
        body: <any>issueBody // Typings for the `github` package are incorrect, so we have to cast to any here.
      },
      (error, response) => this.handleGithubResponse(error, response)
    )
  }

  handleGithubResponse(error, response) {
    if(error) {
      let formattedError = JSON.stringify(error, null, 4)
      let reply = ERROR_TEMPLATE.replace('{PLACEHOLDER}', formattedError)
      this.message.reply(reply)
      return
    }
    let reply = SUCCESS_TEMPLATE.replace('{PLACEHOLDER}', response.html_url)
    this.message.reply(reply)
  }
}

const ISSUE_TEMPLATE =
`
{PLACEHOLDER}

---
Beep, boop, I'm [a bot](https://github.com/LeagueSandbox/IssueBot)! This issue was created by \`@{USER}\` in \`#{CHANNEL}\`.
`

const ERROR_TEMPLATE =
`
Command should be: !issue {Repository} {Title} {Message}
Example: !issue "GameServer" "Make a beginner bot AI script" "Make a game script to control a bot champion. Buy items, go to lane, try to beat Nexus."
An error occurred while creating the issue.
Details:
\`\`\`
{PLACEHOLDER}
\`\`\`
`

const SUCCESS_TEMPLATE =
`
Issue created successfully! {PLACEHOLDER}
`
