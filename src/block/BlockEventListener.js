export class BlockEventListener {

    constructor() {
        this.handlers = [];
    }

    registerHandler(handler) {
        this.handlers.push(handler);
    }

    async onBlock(block) {
        await Promise.all(this.handlers.map(async handler => {
            return await handler.handle(block);
        }));
        return true;
    }
}