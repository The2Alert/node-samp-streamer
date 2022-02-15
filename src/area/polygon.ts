import {Player, Position2D} from "@sa-mp/core";
import * as amx from "@sa-mp/amx";
import {DynamicArea} from "./area";
import {Streamer} from "..";

export interface DynamicPolygonOptions {
    points: Position2D[]; 
    z?: {min: number, max: number};
    world?: number;
    interior?: number;
    player?: Player;
    priority?: number;
}

export class DynamicPolygon extends DynamicArea {
    public static create(options: DynamicPolygonOptions): DynamicPolygon {
        const area = new DynamicPolygon(options);
        return area.create();
    }

    constructor(public readonly options: DynamicPolygonOptions) {
        super();
    }

    public create(): DynamicPolygon {
        const {
            points, 
            z = {min: -Streamer.constants.FLOAT_INFINITY, max: Streamer.constants.FLOAT_INFINITY},
            world = -1, 
            interior = -1, 
            player = Player.getById(-1), 
            priority = 0
        } = this.options;
        const nativePoints: number[] = [];
        for(const {x, y} of points)
            nativePoints.push(x, y);
        const maxPoints: number = nativePoints.length;
        this.id = amx.callNative("CreateDynamicPolygon", "vffiiiii", nativePoints, z.min, z.max, maxPoints, world, interior, player.id, priority).retval;
        return this;
    }
}