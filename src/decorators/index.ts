import {Player} from "@sa-mp/core";
import {Get, GetDecorator} from "@sa-mp/decorators";
import {StreamerPlayer} from "..";

export function GetStreamerPlayer(): GetDecorator<typeof Player.Context | typeof Player.Service> {
    return Get(function() {
        return StreamerPlayer.get(this);
    });
}