import * as amx from "@sa-mp/amx";
import {Player, Position} from "@sa-mp/core";
import {StreamerEnum, StreamerTypes} from ".";

export interface StreamerDistanceToItem extends Position {
    dimensions?: number;
}

export class StreamerItem {
    public static get(type: StreamerTypes, id: number): StreamerItem {
        return new StreamerItem(type, id);
    }

    constructor(public readonly type: StreamerTypes, public readonly id: number) {}

    public toggleStatic(toggle: boolean): boolean {
        return Boolean(amx.callNative("Streamer_ToggleItemStatic", "iii", this.type, this.id, Number(toggle)).retval);
    }

    public isToggleStatic(): boolean {
        return Boolean(amx.callNative("Streamer_IsToggleItemStatic", "ii", this.type, this.id).retval);
    }

    public toggleInvAreas(toggle: boolean): boolean {
        return Boolean(amx.callNative("Streamer_ToggleItemInvAreas", "iii", this.type, this.id, Number(toggle)).retval);
    }

    public isToggleInvAreas(): boolean {
        return Boolean(amx.callNative("Streamer_IsToggleItemInvAreas", "ii", this.type, this.id).retval);
    }

    public toggleCallbacks(toggle: boolean): boolean {
        return Boolean(amx.callNative("Streamer_ToggleItemCallbacks", "iii", this.type, this.id, Number(toggle)).retval);
    }

    public isToggleCallbacks(): boolean {
        return Boolean(amx.callNative("Streamer_IsToggleItemCallbacks", "ii", this.type, this.id).retval);
    }

    public getFloatData(data: StreamerEnum): number {
        const [result] = amx.callNative("Streamer_GetFloatData", "iiiF", this.type, this.id, data);
        return result as number;
    }

    public setFloatData(data: StreamerEnum, value: number): boolean {
        return Boolean(amx.callNative("Streamer_SetFloatData", "iiif", this.type, this.id, data, value).retval);
    }

    public getIntData(data: StreamerEnum): number {
        return amx.callNative("Streamer_GetIntData", "iii", this.type, this.id, data).retval;
    }

    public setIntData(data: StreamerEnum, value: number): boolean {
        return Boolean(amx.callNative("Streamer_SetIntData", "iiii", this.type, this.id, data, value).retval);
    }

    public removeIntData(data: StreamerEnum): void {
        amx.callNative("Streamer_RemoveIntData", "iii", this.type, this.id, data);
    }

    public hasIntData(data: StreamerEnum): boolean {
        return Boolean(amx.callNative("Streamer_HasIntData", "iii", this.type, this.id, data).retval);
    }

    public getArrayData(data: StreamerEnum, max: number): number[] {
        const [dest] = amx.callNative("Streamer_GetArrayData", "iiiAi", this.type, this.id, data, max, max);
        return dest as number[];
    }

    public setArrayData(data: StreamerEnum, src: number[]): boolean {
        return Boolean(amx.callNative("Streamer_SetArrayData", "iiiai", this.type, this.id, data, src, src.length).retval);
    }

    public isInArrayData(data: StreamerEnum, value: number): boolean {
        return Boolean(amx.callNative("Streamer_IsInArrayData", "iiii", this.type, this.id, data, value).retval);
    }

    public appendArrayData(data: StreamerEnum, value: number): boolean {
        return Boolean(amx.callNative("Streamer_AppendArrayData", "iiii", this.type, this.id, data, value).retval);
    }

    public removeArrayData(data: StreamerEnum, value: number): boolean {
        return Boolean(amx.callNative("Streamer_RemoveArrayData", "iiii", this.type, this.id, data, value).retval);
    }

    public hasArrayData(data: StreamerEnum): boolean {
        return Boolean(amx.callNative("Streamer_HasArrayData", "iii", this.type, this.id, data).retval);
    }

    public getArrayDataLength(data: StreamerEnum): number {
        return amx.callNative("Streamer_GetArrayDataLength", "iii", this.type, this.id, data).retval;
    }

    public distance({x, y, z, dimensions = 3}: StreamerDistanceToItem): number {
        const [distance] = amx.callNative("Streamer_GetDistanceToItem", "fffiiFi", x, y, z, this.type, this.id, dimensions);
        return distance as number;
    }

    public toggle(player: Player, toggle: boolean): boolean {
        return Boolean(amx.callNative("Streamer_ToggleItem", "iiii", player.id, this.type, this.id, Number(toggle)).retval);
    }

    public isToggle(player: Player): boolean {
        return Boolean(amx.callNative("Streamer_IsToggleItem", "iii", player.id, this.type, this.id).retval);
    }

    public getInternalId(player: Player): number {
        return amx.callNative("Streamer_GetItemInternalID", "iii", player.id, this.type, this.id).retval;
    }

    public isVisible(player: Player): boolean {
        return Boolean(amx.callNative("Streamer_IsItemVisible", "iii", player.id, this.type, this.id).retval);
    }

    public get pos(): Position {
        const [x, y, z] = amx.callNative("Streamer_GetItemPos", "iiFFF", this.type, this.id) as number[];
        return {x, y, z};
    }

    public set pos({x, y, z}: Position) {
        amx.callNative("Streamer_SetItemPos", "iifff", this.type, this.id, x, y, z);
    }

    public get offset(): Position {
        const [x, y, z] = amx.callNative("Streamer_GetItemOffset", "iiFFF", this.type, this.id) as number[];
        return {x, y, z};
    }

    public set offset({x, y, z}: Position) {
        amx.callNative("Streamer_SetItemOffset", "iifff", this.type, this.id, x, y, z);
    }
}