import GitHubApi = require('github')

export class GitHub {
  api: GitHubApi

  constructor(token: string) {
    this.api = new GitHubApi()
    this.api.authenticate({
      type: "oauth",
      token: token
    })
  }

  submitIssue(owner, repo, title, description) {
    return this.api.issues.create({
      owner: owner,
      repo: repo,
      title: title,
      body: description
    })
  }
}
