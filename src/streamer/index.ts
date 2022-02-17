import {EventEmitter, DefaultEventMap} from "tsee";
import {Player} from "@sa-mp/core";
import * as amx from "@sa-mp/amx";
import {StreamerFunctions} from "./functions";
import {StreamerItem, StreamerTypes} from ".";

export * from "./functions";
export * from "./enums";
export * from "./player";
export * from "./item";

export interface StreamerEventMap extends DefaultEventMap {
    "item-stream-in": (streamer: Streamer, item: StreamerItem, forPlayer: Player) => any;
    "item-stream-out": (streamer: Streamer, item: StreamerItem, forPlayer: Player) => any;
    "plugin-error": (streamer: Streamer, error: Error) => any;
}

export class Streamer extends StreamerFunctions {
    public static readonly events: EventEmitter<StreamerEventMap> = new EventEmitter;
    public static readonly on = Streamer.events.on;

    public static init(): void {
        amx.onPublicCall("Streamer_OnItemStreamIn", "iii", (type, id, forplayerid) => {
            const streamer = new Streamer;
            const item: StreamerItem = StreamerItem.get(type as StreamerTypes, id as number);
            const forPlayer: Player = Player.getById(forplayerid as number);
            return Streamer.emit("item-stream-in", streamer, streamer, item, forPlayer);
        });
        amx.onPublicCall("Streamer_OnItemStreamOut", "iii", (type, id, forplayerid) => {
            const streamer = new Streamer;
            const item: StreamerItem = StreamerItem.get(type as StreamerTypes, id as number);
            const forPlayer: Player = Player.getById(forplayerid as number);
            return Streamer.emit("item-stream-out", streamer, streamer, item, forPlayer);
        });
        amx.onPublicCall("Streamer_OnPluginError", "s", (error) => {
            const streamer = new Streamer;
            return Streamer.emit("plugin-error", streamer, streamer, new Error(error as string));
        });
    }

    public static emit<EventKey extends keyof StreamerEventMap>(key: EventKey, streamer: Streamer, ...args: Parameters<StreamerEventMap[EventKey]>): number | void {
        Streamer.events.emit(key, ...args);
        const {retval} = streamer;
        if(typeof retval === "number")
            return retval;
    }

    public retval?: number;
}

Streamer.init();