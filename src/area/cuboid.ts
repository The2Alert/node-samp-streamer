import * as amx from "@sa-mp/amx";
import {Player, Position} from "@sa-mp/core";
import {DynamicArea} from "./area";

export interface DynamicCuboidOptions {
    min: Position;
    max: Position;
    world?: number;
    interior?: number; 
    player?: Player;
    priority?: number;
}

export class DynamicCuboid extends DynamicArea {
    public static create(options: DynamicCuboidOptions): DynamicCuboid {
        const area = new DynamicCuboid(options);
        return area.create();
    }

    constructor(public readonly options: DynamicCuboidOptions) {
        super();
    }

    public create(): DynamicCuboid {
        const {min, max, world = -1, interior = -1, player = Player.getById(-1), priority = 0} = this.options;
        this.id = amx.callNative("CreateDynamicCuboid", "ffffffiiii", min.x, min.y, min.z, max.x, max.y, max.z, world, interior, player.id, priority).retval;
        return this;
    }
}