import * as amx from "@sa-mp/amx";
import {Player, Position} from "@sa-mp/core";
import {DynamicSphere} from ".";

export interface DynamicSphereExOptions extends Position {
    size: number;
    worlds?: number[]; 
    interiors?: number[];
    players?: Player[];
    priority?: number;
}

export class DynamicSphereEx extends DynamicSphere {
    public static create(options: DynamicSphereExOptions): DynamicSphereEx {
        const area = new DynamicSphereEx(options);
        return area.create();
    }

    constructor(public readonly options: DynamicSphereExOptions) {
        super(options);
    }

    public create(): DynamicSphereEx {
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
            "CreateDynamicSphereEx",
            "ffffaaaiiii",
            x, 
            y, 
            z, 
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