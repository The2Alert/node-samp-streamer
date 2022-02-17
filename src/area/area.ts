import {EventEmitter, DefaultEventMap} from "tsee";
import {Player} from "@sa-mp/core";
import * as amx from "@sa-mp/amx";
import {DynamicAreaFunctions} from "./functions";

export * from "./functions";

export interface DynamicAreaEventMap extends DefaultEventMap {
    enter: (player: Player, area: DynamicArea) => any;
    leave: (player: Player, area: DynamicArea) => any;
}

export class DynamicArea extends DynamicAreaFunctions {
    public static readonly events: EventEmitter<DynamicAreaEventMap> = new EventEmitter;
    public static readonly on = DynamicArea.events.on;

    public static init(): void {
        amx.onPublicCall("OnPlayerEnterDynamicArea", "ii", (playerid, areaid) => {
            const player: Player = Player.getById(playerid as number);
            const area: DynamicArea = DynamicArea.getById(areaid as number);
            return DynamicArea.emit("enter", area, player, area);
        });
        amx.onPublicCall("OnPlayerLeaveDynamicArea", "ii", (playerid, areaid) => {
            const player: Player = Player.getById(playerid as number);
            const area: DynamicArea = DynamicArea.getById(areaid as number);
            return DynamicArea.emit("leave", area, player, area);
        });
    }

    public static emit<EventKey extends keyof DynamicAreaEventMap>(key: EventKey, area: DynamicArea, ...args: Parameters<DynamicAreaEventMap[EventKey]>): number | void {
        DynamicArea.events.emit(key, ...args);
        const {retval} = area;
        if(typeof retval === "number")
            return retval;
    }

    public retval?: number;
}

DynamicArea.init();