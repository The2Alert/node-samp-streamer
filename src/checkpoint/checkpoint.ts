import {EventEmitter, DefaultEventMap} from "tsee";
import * as amx from "@sa-mp/amx";
import {Player} from "@sa-mp/core";
import {DynamicCPFunctions} from "./functions";

export interface DynamicCPEventMap extends DefaultEventMap {
    enter: (player: Player, checkpoint: DynamicCP) => any;
    leave: (player: Player, checkpoint: DynamicCP) => any;
}

export class DynamicCP extends DynamicCPFunctions {
    public static readonly events: EventEmitter<DynamicCPEventMap> = new EventEmitter;
    public static readonly on = DynamicCP.events.on;

    public static init(): void {
        amx.onPublicCall("OnPlayerEnterDynamicCP", "ii", (playerid, checkpointid) => {
            const player: Player = Player.getById(playerid as number);
            const checkpoint: DynamicCP = DynamicCP.getById(checkpointid as number);
            return DynamicCP.emit("enter", checkpoint, player, checkpoint);
        });
        amx.onPublicCall("OnPlayerLeaveDynamicCP", "ii", (playerid, checkpointid) => {
            const player: Player = Player.getById(playerid as number);
            const checkpoint: DynamicCP = DynamicCP.getById(checkpointid as number);
            return DynamicCP.emit("leave", checkpoint, player, checkpoint);
        });
    }

    public static emit<EventKey extends keyof DynamicCPEventMap>(key: EventKey, checkpoint: DynamicCP, ...args: Parameters<DynamicCPEventMap[EventKey]>): number | void {
        DynamicCP.events.emit(key, ...args);
        const {retval} = checkpoint;
        if(typeof retval === "number")
            return retval;
    }

    public retval?: number;
}

DynamicCP.init();