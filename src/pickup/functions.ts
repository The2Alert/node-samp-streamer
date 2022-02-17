import {Player, Position} from "@sa-mp/core";
import * as amx from "@sa-mp/amx";
import {DynamicPickup, DynamicArea, Streamer, StreamerItem, StreamerTypes} from "..";

export interface DynamicPickupOptions extends Position {
    model: number; 
    type: number;
    world?: number; 
    interior?: number; 
    player?: Player;
    streamDistance?: number; 
    area?: DynamicArea; 
    priority?: number;
}

export class DynamicPickupFunctions {
    public static create(options: DynamicPickupOptions): DynamicPickup {
        const pickup = new DynamicPickup(options);
        return pickup.create();
    }

    public static getById(id: number): DynamicPickup {
        return new DynamicPickup(id);
    }

    public static isValid(pickup: DynamicPickup): boolean {
        return Boolean(amx.callNative("IsValidDynamicPickup", "i", pickup.id).retval);
    }

    public static destroyAll(): void {
        amx.callNative("DestroyAllDynamicPickups", "");
    }

    public static get count(): number {
        return amx.callNative("CountDynamicPickups", "").retval;
    }

    public id: number = Streamer.constants.INVALID_ID;

    constructor(public readonly idOrOptions: number | DynamicPickupOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): DynamicPickup {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: DynamicPickupOptions = this.idOrOptions;
        const {
            model, 
            type, 
            x, 
            y, 
            z, 
            world = -1, 
            interior = -1, 
            player = Player.getById(-1), 
            streamDistance = Streamer.constants.PICKUP_SD, 
            area = DynamicArea.getById(-1), 
            priority = 0
        } = options;
        this.id = amx.callNative("CreateDynamicPickup", "iifffiiifii", model, type, x, y, z, world, interior, player.id, streamDistance, area.id, priority).retval;
        return this;
    }

    public destroy(): void {
        amx.callNative("DestroyDynamicPickup", "i", this.id);
    }

    public get item(): StreamerItem {
        return StreamerItem.get(StreamerTypes.PICKUP, this.id);
    }

    public is(pickup: DynamicPickup): boolean {
        return this.id === pickup.id;
    }
}