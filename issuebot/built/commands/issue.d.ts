import { Command } from 'discord-harmony';
export declare class IssueCommand extends Command {
    execute(): void;
    handleGithubResponse(error: any, response: any): void;
}
