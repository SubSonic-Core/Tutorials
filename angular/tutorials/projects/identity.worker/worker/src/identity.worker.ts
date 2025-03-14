/// <reference lib="WebWorker" />

import { IIdentityOptions, IWorkerMessage, IWorkerResponse, MessageType } from "identity.abstractions";

export namespace identity {
    const keys = {
        options: new Object("options"),
        db: new Object("index-db")
    };
    const data = new WeakMap();
    export const worker = {
        get initialized(): boolean {
            return data.has(keys.options);
        },
        get options(): IIdentityOptions {
            return data.get(keys.options);
        },
        /**
         * initialize the web worker
         * once this worker has succesfully initialized future calls will
         * not re initialize but will adhere to idempotency.
         * @param options 
         * @returns when true worker was successfully initialized
         */
        initialize: (options: IIdentityOptions): IWorkerResponse => {
            if (!worker.initialized) {
                data.set(keys.options, options);
            }

            return {
                success: worker.initialized
            } as IWorkerResponse;
        },
        onmessage: async (event: MessageEvent) => {
            const msg: IWorkerMessage<any> = event.data;
            let result: IWorkerResponse | undefined;
            switch(msg.event) {
                case MessageType.Init:
                    result = worker.initialize(msg.data);
                    break;
                default:
                    if (worker.initialized) {
                        switch(msg.event) {
                            default:
                                result = {
                                    success: false,
                                    data: new Error(`${msg.event} is not supported.`)
                                };
                        }
                        break;
                    }
                    result = {
                        success: false,
                        data: new Error(`proxy has not been initialized.`)
                    };
            }
            self.postMessage(result);
        }
    };
}

addEventListener('message', identity.worker.onmessage);