import * as amx from "@sa-mp/amx";
import {Player, Position} from "@sa-mp/core";
import {DynamicCube} from ".";

export interface DynamicCubeExOptions {
    min: Position;
    max: Position;
    worlds?: number[];
    interiors?: number[];
    players?: Player[];
    priority?: number;
}

export class DynamicCubeEx extends DynamicCube {
    public static create(options: DynamicCubeExOptions): DynamicCubeEx {
        const area = new DynamicCubeEx(options);
        return area.create();
    }

    constructor(public readonly options: DynamicCubeExOptions) {
        super(options);
    }

    public create(): DynamicCubeEx {
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
            "CreateDynamicCubeEx",
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