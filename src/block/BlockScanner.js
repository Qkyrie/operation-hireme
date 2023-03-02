export class HistoricBlockScanner {

    constructor(stateRepository, blockService, blockEventListener) {
        this.stateRepository = stateRepository;
        this.blockService = blockService;
        this.blockEventListener = blockEventListener;
    }

    async scan() {
        console.log('Starting to scan historic blocks');
        const latestIndexedBlock = parseInt((await this.stateRepository.getState('latest-block'))?.value || 8571140);
        const latestBlock = await this.blockService.getLatestBlock();
        for (let currentBlock = latestIndexedBlock + 1; currentBlock <= latestBlock.number; currentBlock++) {
            //TODO: send this block to a topic
            await this.blockEventListener.onBlock(currentBlock)
        }
        console.log('done scanning historic blocks');
    }
}

export class LiveBlockScanner {
    constructor(stateRepository, blockService, blockEventListener) {
        this.stateRepository = stateRepository;
        this.blockService = blockService;
        this.blockEventListener = blockEventListener;
        this.scanning = false;
    }

    async scan() {
        console.log('Starting to scan live blocks');
        return await this.blockService.getBlockListener(
            this.onBlock.bind(this),
            (error) => {
                console.log(error);
            }
        )
    }

    async onBlock() {
        if (!this.scanning) {
            this.scanning = true;
            const latestIndexedBlock = parseInt((await this.stateRepository.getState('latest-block'))?.value || 8571140);
            const latestBlock = await this.blockService.getLatestBlock();
            for (let currentBlock = latestIndexedBlock + 1; currentBlock <= latestBlock.number; currentBlock++) {
                await this.blockEventListener.onBlock(currentBlock)
            }
            this.scanning = false
        }
    }
}