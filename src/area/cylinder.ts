import {Player, Position2D} from "@sa-mp/core";
import * as amx from "@sa-mp/amx";
import {DynamicArea} from "./area";

export interface DynamicCylinderOptions extends Position2D {
    z: {min: number, max: number}; 
    size: number; 
    world?: number; 
    interior?: number; 
    player?: Player;
    priority?: number;
}

export class DynamicCylinder extends DynamicArea {
    public static create(options: DynamicCylinderOptions): DynamicCylinder {
        const area = new DynamicCylinder(options);
        return area.create();
    }

    constructor(public readonly options: DynamicCylinderOptions) {
        super();
    }

    public create(): DynamicCylinder {
        const {x, y, z, size, world = -1, interior = -1, player = Player.getById(-1), priority = 0} = this.options;
        this.id = amx.callNative("CreateDynamicCylinder", "fffffiiii", x, y, z.min, z.max, size, world, interior, player.id, priority).retval;
        return this;
    }
}