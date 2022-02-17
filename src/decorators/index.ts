import {GameMode, Player} from "@sa-mp/core";
import {Get, GetDecorator} from "@sa-mp/decorators";
import {Streamer, StreamerPlayer} from "..";

export function GetStreamer(): GetDecorator<typeof GameMode.Context | typeof GameMode.Service> {
    return Get(function() {
        return Streamer;
    });
}

export function GetStreamerPlayer(): GetDecorator<typeof Player.Context | typeof Player.Service> {
    return Get(function() {
        return StreamerPlayer.get(this);
    });
}