import * as amx from "@sa-mp/amx";
import {Player, Position2D} from "@sa-mp/core";
import {DynamicCircle} from ".";

export interface DynamicCircleExOptions extends Position2D {
    size: number;
    worlds?: number[];
    interiors?: number[];
    players?: Player[];
    priority?: number;
}

export class DynamicCircleEx extends DynamicCircle {
    public static create(options: DynamicCircleExOptions): DynamicCircleEx {
        const area = new DynamicCircleEx(options);
        return area.create();
    }

    constructor(public readonly options: DynamicCircleExOptions) {
        super(options);
    }

    public create(): DynamicCircleEx {
        const {
            x, 
            y, 
            size, 
            worlds = [-1], 
            interiors = [-1], 
            players = [Player.getById(-1)], 
            priority = 0
        } = this.options;
        const maxWorlds: number = worlds.length; 
        const maxInteriors: number = interiors.length; 
        const maxPlayers: number = players.length;
        this.id = amx.callNative(
            "CreateDynamicCircleEx",
            "fffaaaiiii",
            x, 
            y, 
            size, 
            worlds, 
            interiors, 
            players.map(({id}) => id), 
            priority, 
            maxWorlds, 
            maxInteriors, 
            maxPlayers
        ).retval;
        return this;
    }
}