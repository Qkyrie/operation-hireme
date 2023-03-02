import {StateRepository} from "../data/StateRepository.js";
import {getKnex} from "../db/knex.js";
import {TransactionRepository} from "../data/TransactionRepository.js";
import {AccountRepository} from "../data/AccountRepository.js";
import Web3 from "web3";
import Bottleneck from "bottleneck";
import {HistoricBlockScanner, LiveBlockScanner} from "../block/BlockScanner.js";
import {BlockService} from "../block/BlockService.js";
import {TransactionService} from "../transaction/transaction.service.js";
import {TransactionImporter} from "../transaction/TransactionImporter.js";
import {app} from "./rest.js";
import * as dotenv from "dotenv";
import {ChainService} from "../chain/chain.service.js";
import {BlockEventListener} from "../block/BlockEventListener.js";

class ObjectFactory {
    constructor(
        wsAddress
    ) {
        let knex = getKnex();
        this.stateRepository = new StateRepository(knex);
        this.transactionRepository = new TransactionRepository(knex);
        this.accountRepository = new AccountRepository(knex);

        this.web3 = new Web3(new Web3.providers.WebsocketProvider(wsAddress));
        this.web3limiter = new Bottleneck(
            {
                maxConcurrent: 5,
                minTime: 100
            }
        )

        this.chainService = new ChainService(this.web3);
        this.transactionService = new TransactionService(this.web3, this.web3limiter, this.transactionRepository);
        this.blockService = new BlockService(this.web3, this.web3limiter);

        this.blockEventListener = new BlockEventListener();

        this.transactionImporter = new TransactionImporter(this.blockService, this.stateRepository, this.transactionService, this.chainService)
        this.historicBlockScanner = new HistoricBlockScanner(this.stateRepository, this.blockService, this.blockEventListener);
        this.liveBlockScanner = new LiveBlockScanner(this.stateRepository, this.blockService, this.blockEventListener);

        this.app = app;
    }
}

dotenv.config();
const wsAddress = process.env.WS_ADDRESS;

export const objectFactory = new ObjectFactory(
    wsAddress
);