import {Player, Position} from "@sa-mp/core";
import * as amx from "@sa-mp/amx";
import {DynamicArea, Streamer, DynamicCP, StreamerItem, StreamerTypes} from "..";

export interface DynamicCPOptions extends Position {
    size: number;
    world?: number; 
    interior?: number; 
    player?: Player;
    streamDistance?: number; 
    area?: DynamicArea; 
    priority?: number;
}

export class DynamicCPFunctions {
    public static create(options: DynamicCPOptions): DynamicCP {
        const checkpoint = new DynamicCP(options);
        return checkpoint.create();
    }

    public static getById(id: number): DynamicCP {
        return new DynamicCP(id);
    }

    public static isValid(checkpoint: DynamicCP): boolean {
        return Boolean(amx.callNative("IsValidDynamicCP", "i", checkpoint.id).retval);
    }

    public static destroyAll(): void {
        amx.callNative("DestroyAllDynamicCPs", "");
    }

    public static get count(): number {
        return amx.callNative("CountDynamicCPs", "").retval;
    }

    public id: number = Streamer.constants.INVALID_ID;
    
    constructor(public readonly idOrOptions: number | DynamicCPOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): DynamicCP {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: DynamicCPOptions = this.idOrOptions;
        const {
            x, 
            y, 
            z, 
            size, 
            world = -1, 
            interior = -1, 
            player = Player.getById(-1), 
            streamDistance = Streamer.constants.CP_SD, 
            area = DynamicArea.getById(-1), 
            priority = 0
        } = options;
        this.id = amx.callNative("CreateDynamicCP", "ffffiiifii", x, y, z, size, world, interior, player.id, streamDistance, area.id, priority).retval;
        return this;
    }

    public destroy(): void {
        amx.callNative("DestroyDynamicCP", "i", this.id);
    }

    public get item(): StreamerItem {
        return StreamerItem.get(StreamerTypes.CP, this.id);
    }

    public is(checkpoint: DynamicCP): boolean {
        return this.id === checkpoint.id;
    }
}