import GitHubApi = require('github');
export declare class GitHub {
    api: GitHubApi;
    constructor(token: string);
    submitIssue(owner: any, repo: any, title: any, description: any): Promise<any>;
}
