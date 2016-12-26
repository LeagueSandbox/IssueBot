import * as Harmony from 'discord-harmony';
import { GitHub } from './github';
export declare class IssueBot extends Harmony.Bot {
    gitHub: GitHub;
    constructor();
    loadCommands(): void;
}
declare var _default: IssueBot;
export default _default;
