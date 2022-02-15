import * as amx from "@sa-mp/amx";
import {Player, Position} from "@sa-mp/core";
import {DynamicArea} from "./area";

export interface DynamicSphereOptions extends Position {
    size: number; 
    world?: number; 
    interior?: number; 
    player?: Player;
    priority?: number;
}

export class DynamicSphere extends DynamicArea {
    public static create(options: DynamicSphereOptions): DynamicSphere {
        const area = new DynamicSphere(options);
        return area.create();
    } 

    constructor(public readonly options: DynamicSphereOptions) {
        super();
    }

    public create(): DynamicSphere {
        const {x, y, z, size, world = -1, interior = -1, player = Player.getById(-1), priority = 0} = this.options;
        this.id = amx.callNative("CreateDynamicSphere", "ffffiiii", x, y, z, size, world, interior, player.id, priority).retval;
        return this;
    }
}