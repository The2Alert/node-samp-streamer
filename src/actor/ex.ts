import * as amx from "@sa-mp/amx";
import {Player, Position} from "@sa-mp/core";
import {DynamicActor} from ".";
import {DynamicArea, Streamer} from "..";

export interface DynamicActorExOptions extends Position {
    model: number;
    rotation: number;
    invulnerable?: boolean;
    health?: number;
    streamDistance?: number;
    worlds?: number[];
    interiors?: number[];
    players?: Player[];
    areas?: DynamicArea[];
    priority?: number;
}

export class DynamicActorEx extends DynamicActor {
    public static create(options: DynamicActorExOptions): DynamicActorEx {
        const actor = new DynamicActorEx(options);
        return actor.create();
    }

    constructor(public readonly options: DynamicActorExOptions) {
        super(Streamer.constants.INVALID_ID);
    }

    public create(): DynamicActorEx {
        const {
            model, 
            x, 
            y, 
            z, 
            rotation, 
            invulnerable = true, 
            health = 100.0, 
            streamDistance = Streamer.constants.ACTOR_SD, 
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
            "CreateDynamicActorEx",
            "iffffiffaaaaiiiii",
            model, 
            x, 
            y, 
            z, 
            rotation, 
            Number(invulnerable), 
            health, 
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