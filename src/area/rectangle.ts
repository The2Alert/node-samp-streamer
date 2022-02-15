import * as amx from "@sa-mp/amx";
import {Player, Position2D} from "@sa-mp/core";
import {DynamicArea} from "./area";

export interface DynamicRectangleOptions {
    min: Position2D;
    max: Position2D;
    world?: number;
    interior?: number; 
    player?: Player;
    priority?: number;
}

export class DynamicRectangle extends DynamicArea {
    public static create(options: DynamicRectangleOptions): DynamicRectangle {
        const area = new DynamicRectangle(options);
        return area.create();
    }

    constructor(public readonly options: DynamicRectangleOptions) {
        super();
    }

    public create(): DynamicRectangle {
        const {min, max, world = -1, interior = -1, player = Player.getById(-1), priority = 0} = this.options;
        this.id = amx.callNative("CreateDynamicRectangle", "ffffiiii", min.x, min.y, max.x, max.y, world, interior, player.id, priority).retval;
        return this;
    }
}