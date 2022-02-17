import {EventEmitter, DefaultEventMap} from "tsee";
import {Player} from "@sa-mp/core";
import * as amx from "@sa-mp/amx";
import {DynamicRaceCPFunctions} from "./functions";

export interface DynamicRaceCPEventMap extends DefaultEventMap {
    enter: (player: Player, checkpoint: DynamicRaceCP) => any;
    leave: (player: Player, checkpoint: DynamicRaceCP) => any;
}

export class DynamicRaceCP extends DynamicRaceCPFunctions {
    public static readonly events: EventEmitter<DynamicRaceCPEventMap> = new EventEmitter;
    public static readonly on = DynamicRaceCP.events.on;
    
    public static init(): void {
        amx.onPublicCall("OnPlayerEnterDynamicRaceCP", "ii", (playerid, checkpointid) => {
            const player: Player = Player.getById(playerid as number);
            const checkpoint: DynamicRaceCP = DynamicRaceCP.getById(checkpointid as number);
            return DynamicRaceCP.emit("enter", checkpoint, player, checkpoint);
        });
        amx.onPublicCall("OnPlayerLeaveDynamicRaceCP", "ii", (playerid, checkpointid) => {
            const player: Player = Player.getById(playerid as number);
            const checkpoint: DynamicRaceCP = DynamicRaceCP.getById(checkpointid as number);
            return DynamicRaceCP.emit("leave", checkpoint, player, checkpoint);
        });
    }

    public static emit<EventKey extends keyof DynamicRaceCPEventMap>(key: EventKey, checkpoint: DynamicRaceCP, ...args: Parameters<DynamicRaceCPEventMap[EventKey]>): number | void {
        DynamicRaceCP.events.emit(key, ...args);
        const {retval} = checkpoint;
        if(typeof retval === "number")
            return retval;
    }

    public retval?: number;
}

DynamicRaceCP.init();