export abstract class Command {
  protected message: any
  protected args: string

  constructor(message: any, args: string) {
    this.message = message
    this.args = args
  }

  public abstract execute() : void
};
export default Command
