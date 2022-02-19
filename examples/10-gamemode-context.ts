import {GameMode} from "@sa-mp/core";
import {Context} from "@sa-mp/decorators";
import {OnStreamerPluginError, Streamer, StreamerGameModeExtension} from "@sa-mp/streamer";

@Context()
export class Mode extends GameMode.Context implements OnStreamerPluginError {
    public onInit(): void {
        Streamer.toggleErrorCallback(true);
        Streamer.getUpperBound(-1);
    }

    public onStreamerPluginError(streamer: Streamer, error: Error): void {
        console.log(error);
    }
}

GameMode.Factory.create(Mode, [StreamerGameModeExtension]);