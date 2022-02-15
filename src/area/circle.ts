import {Player, Position2D} from "@sa-mp/core";
import * as amx from "@sa-mp/amx";
import {DynamicArea} from "./area";

export interface DynamicCircleOptions extends Position2D {
    size: number;
    world?: number; 
    interior?: number; 
    player?: Player;
    priority?: number;
}

export class DynamicCircle extends DynamicArea {
    public static create(options: DynamicCircleOptions): DynamicCircle {
        const area = new DynamicCircle(options);
        return area.create();
    }
 
    constructor(public readonly options: DynamicCircleOptions) {
        super();
    }

    public create(): DynamicCircle {
        const {x, y, size, world = -1, interior = -1, player = Player.getById(-1), priority = 0} = this.options;
        this.id = amx.callNative("CreateDynamicCircle", "fffiiii", x, y, size, world, interior, player.id, priority).retval;
        return this;
    }
}