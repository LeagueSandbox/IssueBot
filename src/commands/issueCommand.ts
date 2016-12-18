import Bot from '../../issuebot'
import Command  from '../command'
import parseArgs from '../utils'

export default class IssueCommand extends Command {
  execute() {
    var params = parseArgs(this.args, 3)
    if(!params) {
      return
    }
    Bot.gitHub.api.issues.create({
        owner: "LeagueSandbox",
        repo: params[0],
        title: params[1],
        body: params[2]
      },
      (error, response) => this.handleGithubResponse(error, response)
    )
  }

  handleGithubResponse(error, response) {
    if(error) {
      let formattedError = JSON.stringify(error, null, 4)
      let reply = ERROR_TEMPLATE.replace('{PLACEHOLDER}', formattedError)
      this.message.reply(reply)
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
