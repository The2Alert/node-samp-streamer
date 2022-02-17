import * as amx from "@sa-mp/amx";
import {Player, Position2D} from "@sa-mp/core";
import {DynamicCylinder} from ".";

export interface DynamicCylinderExOptions extends Position2D {
    z: {min: number, max: number};
    size: number; 
    worlds?: number[]; 
    interiors?: number[]; 
    players?: Player[];
    priority?: number;
}

export class DynamicCylinderEx extends DynamicCylinder {
    public static create(options: DynamicCylinderExOptions): DynamicCylinderEx {
        const area = new DynamicCylinderEx(options);
        return area.create();
    }

    constructor(public readonly options: DynamicCylinderExOptions) {
        super(options);
    }

    public create(): DynamicCylinderEx {
        const {
            x, 
            y, 
            z,
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
            "CreateDynamicCylinderEx",
            "fffffaaaiiii",
            x, 
            y, 
            z.min, 
            z.max, 
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