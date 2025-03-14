import { IIdentityOptions, IWorkerMessage, MessageType } from "identity.abstractions";

export class InitMessage implements IWorkerMessage<IIdentityOptions> {
    data: IIdentityOptions;
    event: MessageType;

    constructor(options: IIdentityOptions) {
        this.data = options;
        this.event = MessageType.Init;
    }
}