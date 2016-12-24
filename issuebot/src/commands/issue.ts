import Bot from '../issuebot'
import { Command }  from 'discord-harmony'
import { parseArgs } from 'discord-harmony'

export class IssueCommand extends Command {
  execute() {
    if(!this.args) {
      return
    }
    Bot.gitHub.api.issues.create({
        owner: "LeagueSandbox",
        repo: this.args[0],
        title: this.args[1],
        body: this.args[2]
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


const ERROR_TEMPLATE =
`
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
