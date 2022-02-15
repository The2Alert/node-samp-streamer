import {Player, Position} from "@sa-mp/core";
import * as amx from "@sa-mp/amx";
import {DynamicArea} from "./area";

export interface DynamicCubeOptions {
    min: Position;
    max: Position;
    world?: number;
    interior?: number; 
    player?: Player;
    priority?: number;
}

export class DynamicCube extends DynamicArea {
    public static create(options: DynamicCubeOptions): DynamicCube {
        const area = new DynamicCube(options);
        return area.create();
    }

    constructor(public readonly options: DynamicCubeOptions) {
        super();
    }

    public create(): DynamicCube {
        const {min, max, world = -1, interior = -1, player = Player.getById(-1), priority = 0} = this.options;
        this.id = amx.callNative("CreateDynamicCube", "ffffffiiii", min.x, min.y, min.z, max.x, max.y, max.z, world, interior, player.id, priority).retval;
        return this;
    }
}