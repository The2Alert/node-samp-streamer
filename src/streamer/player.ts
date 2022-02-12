import * as amx from "@sa-mp/amx";
import {Player, Position} from "@sa-mp/core";
import {StreamerTypes} from ".";

export interface StreamerUpdateExOptions extends Position {
    world?: number;
    interior?: number;
    type?: StreamerTypes;
    compensatedTime?: number;
    freezePlayer?: boolean;
}

export class StreamerPlayer {
    public static get(player: Player): StreamerPlayer {
        return new StreamerPlayer(player);
    }

    private constructor(public readonly player: Player) {}

    public get tickRate(): number {
        return amx.callNative("Streamer_GetPlayerTickRate", "i", this.player.id).retval;
    }

    public set tickRate(rate: number) {
        amx.callNative("Streamer_SetPlayerTickRate", "ii", this.player.id, rate);
    }

    public toggleIdleUpdate(toggle: boolean): boolean {
        return Boolean(amx.callNative("Streamer_ToggleIdleUpdate", "ii", this.player.id, Number(toggle)).retval);
    }

    public isToggleIdleUpdate(): boolean {
        return Boolean(amx.callNative("Streamer_IsToggleIdleUpdate", "i", this.player.id).retval);
    }

    public toggleCameraUpdate(toggle: boolean): boolean {
        return Boolean(amx.callNative("Streamer_ToggleCameraUpdate", "ii", this.player.id, Number(toggle)).retval);
    }

    public isToggleCameraUpdate(): boolean {
        return Boolean(amx.callNative("Streamer_IsToggleCameraUpdate", "i", this.player.id).retval);
    }

    public toggleItemUpdate(type: StreamerTypes, toggle: boolean): boolean {
        return Boolean(amx.callNative("Streamer_ToggleItemUpdate", "iii", this.player.id, type, Number(toggle)).retval);
    }

    public isToggleItemUpdate(type: StreamerTypes): boolean {
        return Boolean(amx.callNative("Streamer_IsToggleItemUpdate", "ii", this.player.id, type).retval);
    }

    public update(type: StreamerTypes = -1): boolean {
        return Boolean(amx.callNative("Streamer_Update", "ii", this.player.id, type).retval);
    }

    public updateEx({x, y, z, world = -1, interior = -1, type = -1, compensatedTime = -1, freezePlayer = true}: StreamerUpdateExOptions): boolean {
        return Boolean(amx.callNative("Streamer_UpdateEx", "ifffiiiii", this.player.id, x, y, z, world, interior, type, compensatedTime, Number(freezePlayer)).retval);
    }

    public getAllVisibleItems(type: StreamerTypes, maxItems: number): number[] {
        const [items] = amx.callNative("Streamer_GetAllVisibleItems", "iiAi", this.player.id, type, maxItems, maxItems);
        return items as number[];
    }
}