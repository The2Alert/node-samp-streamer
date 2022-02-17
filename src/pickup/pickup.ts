import {EventEmitter, DefaultEventMap} from "tsee";
import * as amx from "@sa-mp/amx";
import {Player} from "@sa-mp/core";
import {DynamicPickupFunctions} from "./functions";

export interface DynamicPickupEventMap extends DefaultEventMap {
    "pick-up": (player: Player, pickup: DynamicPickup) => any;
}

export class DynamicPickup extends DynamicPickupFunctions {
    public static readonly events: EventEmitter<DynamicPickupEventMap> = new EventEmitter;
    public static readonly on = DynamicPickup.events.on;
    
    public static init(): void {
        amx.onPublicCall("OnPlayerPickUpDynamicPickup", "ii", (playerid, pickupid) => {
            const player: Player = Player.getById(playerid as number);
            const pickup: DynamicPickup = DynamicPickup.getById(pickupid as number);
            return DynamicPickup.emit("pick-up", pickup, player, pickup);
        });
    }

    public static emit<EventKey extends keyof DynamicPickupEventMap>(key: EventKey, pickup: DynamicPickup, ...args: Parameters<DynamicPickupEventMap[EventKey]>): number | void {
        DynamicPickup.events.emit(key, ...args);
        const {retval} = pickup;
        if(typeof retval === "number")
            return retval;
    }

    public retval?: number;
}

DynamicPickup.init();