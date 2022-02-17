import * as amx from "@sa-mp/amx";
import {Player, Position} from "@sa-mp/core";
import {DynamicPickup} from ".";
import {DynamicArea, Streamer} from "..";

export interface DynamicPickupExOptions extends Position {
    model: number;
    type: number;
    streamDistance?: number;
    worlds?: number[];
    interiors?: number[];
    players?: Player[];
    areas?: DynamicArea[];
    priority?: number;
}

export class DynamicPickupEx extends DynamicPickup {
    public static create(options: DynamicPickupExOptions): DynamicPickupEx {
        const pickup = new DynamicPickupEx(options);
        return pickup.create();
    }

    constructor(public readonly options: DynamicPickupExOptions) {
        super(Streamer.constants.INVALID_ID);
    }

    public create(): DynamicPickupEx {
        const {
            model, 
            type, 
            x, 
            y, 
            z, 
            streamDistance = Streamer.constants.PICKUP_SD, 
            worlds = [-1], 
            interiors = [-1], 
            players = [Player.getById(-1)], 
            areas = [DynamicArea.getById(-1)], 
            priority = 0
        } = this.options;
        const maxWorlds: number = worlds.length; 
        const maxInteriors: number = interiors.length; 
        const maxPlayers: number = players.length; 
        const maxAreas: number = areas.length;
        this.id = amx.callNative(
            "CreateDynamicPickupEx",
            "iiffffaaaaiiiii",
            model, 
            type, 
            x, 
            y, 
            z, 
            streamDistance, 
            worlds, 
            interiors, 
            players.map(({id}) => id), 
            areas.map(({id}) => id), 
            priority, 
            maxWorlds, 
            maxInteriors,
            maxPlayers, 
            maxAreas
        ).retval;
        return this;
    }
}