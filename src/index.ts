import {WebServer} from './WebServer';
import config from "../config.json";
import {Utils, logLevel, logModule} from "./Utils/Utils";
import {MinIO} from "./Utils/MinIO";
import axios from "axios";

async function start() {
    Utils.log(logLevel.INFO, logModule.GALAXYBOT, "Starting GalaxyBot V4 - NSFW Classifier");
    new MinIO(config);
    new WebServer().start();
}

start().then(() => {
    // Ready for Pterodactyl JS Egg
    console.log("Ready!")
    Utils.log(logLevel.SUCCESS, logModule.GALAXYBOT, "GalaxyBot V4 - NSFW Classifier started");

    setInterval(async () => {
        await status();
    }, config.status.interval)
}).catch((e) => {
    Utils.log(logLevel.ERROR, logModule.GALAXYBOT, e);
    process.exit(1);
});

async function status() {
    await axios.post(`${config.status.kumaBase}/api/push/${config.status.id}?status=up&msg=OK&ping=42`)
}
