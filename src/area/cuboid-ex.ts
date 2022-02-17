import * as amx from "@sa-mp/amx";
import {Player, Position} from "@sa-mp/core";
import {DynamicCuboid} from ".";

export interface DynamicCuboidExOptions {
    min: Position;
    max: Position;
    worlds?: number[];
    interiors?: number[]; 
    players?: Player[];
    priority?: number;
}

export class DynamicCuboidEx extends DynamicCuboid {
    public static create(options: DynamicCuboidExOptions): DynamicCuboidEx {
        const area = new DynamicCuboidEx(options);
        return area.create();
    }

    constructor(public readonly options: DynamicCuboidExOptions) {
        super(options);
    }

    public create(): DynamicCuboidEx {
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
            "CreateDynamicCuboidEx",
            "ffffffaaaiiii",
            min.x, 
            min.y, 
            min.z, 
            max.x, 
            max.y, 
            max.z, 
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