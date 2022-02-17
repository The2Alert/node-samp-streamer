import * as amx from "@sa-mp/amx";
import {Player, Position2D} from "@sa-mp/core";
import {DynamicRectangle} from ".";

export interface DynamicRectangleExOptions {
    min: Position2D;
    max: Position2D;
    worlds?: number[];
    interiors?: number[];
    players?: Player[];
    priority?: number;
}

export class DynamicRectangleEx extends DynamicRectangle {
    public static create(options: DynamicRectangleExOptions): DynamicRectangleEx {
        const area = new DynamicRectangleEx(options);
        return area.create();
    }

    constructor(public readonly options: DynamicRectangleExOptions) {
        super(options);
    }

    public create(): DynamicRectangleEx {
        const {
            min, 
            max, 
            worlds = [-1], 
            interiors = [-1], 
            players = [Player.getById(-1)], 
            priority = 0
        } = this.options;
        const maxWorlds: number = worlds.length;
        const maxInteriors: number = interiors.length;
        const maxPlayers: number = players.length;
        this.id = amx.callNative(
            "CreateDynamicRectangleEx",
            "ffffaaaiiii",
            min.x, 
            min.y, 
            max.x, 
            max.y, 
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