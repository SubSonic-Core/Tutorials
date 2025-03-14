import { MessageType } from "../types/message.type";

export interface IWorkerMessage<T> {
    data: T;
    event: MessageType;
}

export interface IWorkerResponse {
    success: boolean;
    data: any;
}