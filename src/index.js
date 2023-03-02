import {objectFactory} from "./utils/ObjectFactory.js";

async function importer() {
    const {
        historicBlockScanner,
        liveBlockScanner,
        blockEventListener
    } = objectFactory;


    //register all handlers for new blocks
    blockEventListener.registerHandler(
        objectFactory.transactionImporter
    )

    await historicBlockScanner.scan();
    await liveBlockScanner.scan();
}

async function health() {
    objectFactory.app.get('/health', (req, res) => {
        res.send(JSON.stringify({status: 'UP'}));
    });
}

async function run() {
    importer().catch(ex => {
        console.log('issue during import job, restarting job');
        setTimeout(() => {
            run();
        }, 10000);
    });
}

health();
run();

