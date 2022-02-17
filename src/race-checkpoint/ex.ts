import * as amx from "@sa-mp/amx";
import {Player, Position} from "@sa-mp/core";
import {DynamicRaceCP} from ".";
import {DynamicArea, Streamer} from "..";

export interface DynamicRaceCPExOptions extends Position {
    type: number;
    next: Position;
    size: number;
    streamDistance?: number;
    worlds?: number[];
    interiors?: number[];
    players?: Player[];
    areas?: DynamicArea[];
    priority?: number;
}

export class DynamicRaceCPEx extends DynamicRaceCP {
    public static create(options: DynamicRaceCPExOptions): DynamicRaceCPEx {
        const checkpoint = new DynamicRaceCPEx(options);
        return checkpoint.create();
    }

    constructor(public readonly options: DynamicRaceCPExOptions) {
        super(Streamer.constants.INVALID_ID);
    }

    public create(): DynamicRaceCPEx {
        const {
            type, 
            x, 
            y,
            z, 
            next, 
            size, 
            streamDistance = Streamer.constants.RACE_CP_SD, 
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
            "CreateDynamicRaceCPEx",
            "iffffffffaaaaiiiii",
            type, 
            x, 
            y, 
            z, 
            next.x, 
            next.y, 
            next.z, 
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