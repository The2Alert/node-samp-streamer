import {GameMode} from "@sa-mp/core";
import {Streamer} from "@sa-mp/streamer";

GameMode.on("init", () => {
    Streamer.toggleErrorCallback(true);
    Streamer.getUpperBound(-1);
});

Streamer.on("plugin-error", (streamer, error) => {
    console.log(error);
});