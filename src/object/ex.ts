import * as amx from "@sa-mp/amx";
import {Player, Position} from "@sa-mp/core";
import {DynamicObject} from ".";
import {DynamicArea, Streamer} from "..";

export interface DynamicObjectExOptions extends Position {
    model: number;
    rot: Position;
    streamDistance?: number;
    drawDistance?: number;
    worlds?: number[];
    interiors?: number[]; 
    players?: Player[];
    areas?: DynamicArea[];
    priority?: number;
}

export class DynamicObjectEx extends DynamicObject {
    public static create(options: DynamicObjectExOptions): DynamicObjectEx {
        const object = new DynamicObjectEx(options);
        return object.create();
    }

    constructor(public readonly options: DynamicObjectExOptions) {
        super(Streamer.constants.INVALID_ID);
    }

    public create(): DynamicObjectEx {
        const {
            model, 
            x, 
            y, 
            z, 
            rot, 
            streamDistance = Streamer.constants.OBJECT_SD, 
            drawDistance = Streamer.constants.OBJECT_DD, 
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
            "CreateDynamicObjectEx", 
            "iffffffffaaaaiiiii", 
            model, 
            x, 
            y, 
            z, 
            rot.x, 
            rot.y, 
            rot.z, 
            streamDistance, 
            drawDistance, 
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