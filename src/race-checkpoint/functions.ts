import {Player, Position} from "@sa-mp/core";
import * as amx from "@sa-mp/amx";
import {DynamicRaceCP, DynamicArea, Streamer, StreamerItem, StreamerTypes} from "..";

export interface DynamicRaceCPOptions extends Position {
    type: number;
    next: Position;
    size: number; 
    world?: number; 
    interior?: number; 
    player?: Player;
    streamDistance?: number; 
    area?: DynamicArea; 
    priority?: number;
}

export class DynamicRaceCPFunctions {
    public static create(options: DynamicRaceCPOptions): DynamicRaceCP {
        const checkpoint = new DynamicRaceCP(options);
        return checkpoint.create();
    }

    public static getById(id: number): DynamicRaceCP {
        return new DynamicRaceCP(id);
    }

    public static isValid(checkpoint: DynamicRaceCP): boolean {
        return Boolean(amx.callNative("IsValidDynamicRaceCP", "i", checkpoint.id).retval);
    }

    public static destroyAll(): void {
        amx.callNative("DestroyAllDynamicRaceCPs", "");
    }

    public static get count(): number {
        return amx.callNative("CountDynamicRaceCPs", "").retval;
    }

    public id: number = Streamer.constants.INVALID_ID;

    constructor(public readonly idOrOptions: number | DynamicRaceCPOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): DynamicRaceCP {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: DynamicRaceCPOptions = this.idOrOptions;
        const {
            type, 
            x, 
            y, 
            z, 
            next,
            size, 
            world = -1,
            interior = -1, 
            player = Player.getById(-1), 
            streamDistance = Streamer.constants.RACE_CP_SD, 
            area = DynamicArea.getById(-1), 
            priority = 0
        } = options;
        this.id = amx.callNative("CreateDynamicRaceCP", "ifffffffiiifii", type, x, y, z, next.x, next.y, next.z, size, world, interior, player.id, streamDistance, area.id, priority).retval;
        return this;
    }

    public destroy(): void {
        amx.callNative("DestroyDynamicRaceCP", "i", this.id);
    }

    public get item(): StreamerItem {
        return StreamerItem.get(StreamerTypes.RACE_CP, this.id);
    }

    public is(checkpoint: DynamicRaceCP): boolean {
        return this.id === checkpoint.id;
    }
}