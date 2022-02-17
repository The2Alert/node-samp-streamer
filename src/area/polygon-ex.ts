import * as amx from "@sa-mp/amx";
import {Player, Position2D} from "@sa-mp/core";
import {DynamicPolygon} from ".";
import {Streamer} from "..";

export interface DynamicPolygonExOptions {
    points: Position2D[];
    z?: {min: number, max: number};
    worlds?: number[];
    interiors?: number[];
    players?: Player[];
    priority?: number;
}

export class DynamicPolygonEx extends DynamicPolygon {
    public static create(options: DynamicPolygonExOptions): DynamicPolygonEx {
        const area = new DynamicPolygonEx(options);
        return area.create();
    }

    constructor(public readonly options: DynamicPolygonExOptions) {
        super(options);
    }

    public create(): DynamicPolygonEx {
        const {
            points, 
            z = {min: -Streamer.constants.FLOAT_INFINITY, max: Streamer.constants.FLOAT_INFINITY}, 
            worlds = [-1], 
            interiors = [-1], 
            players = [Player.getById(-1)], 
            priority = 0
        } = this.options;
        const nativePoints: number[] = [];
        for(const {x, y} of points)
            nativePoints.push(x, y);
        const maxPoints: number = nativePoints.length;
        const maxWorlds: number = worlds.length;
        const maxInteriors: number = interiors.length;
        const maxPlayers: number = players.length;
        this.id = amx.callNative(
            "CreateDynamicPolygonEx",
            "vffiaaaiiii",
            nativePoints, 
            z.min, 
            z.max, 
            maxPoints, 
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