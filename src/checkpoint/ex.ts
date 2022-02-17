import * as amx from "@sa-mp/amx";
import {Player, Position} from "@sa-mp/core";
import {DynamicCP} from ".";
import {DynamicArea, Streamer} from "..";

export interface DynamicCPExOptions extends Position {
    size: number;
    streamDistance?: number;
    worlds?: number[];
    interiors?: number[];
    players?: Player[];
    areas?: DynamicArea[];
    priority?: number;
}

export class DynamicCPEx extends DynamicCP {
    public static create(options: DynamicCPExOptions): DynamicCPEx {
        const checkpoint = new DynamicCPEx(options);
        return checkpoint.create();
    }

    constructor(public readonly options: DynamicCPExOptions) {
        super(Streamer.constants.INVALID_ID);
    }

    public create(): DynamicCPEx {
        const {
            x, 
            y, 
            z, 
            size, 
            streamDistance = Streamer.constants.CP_SD, 
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
            "CreateDynamicCPEx",
            "fffffaaaaiiiii",
            x, 
            y, 
            z, 
            size, 
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