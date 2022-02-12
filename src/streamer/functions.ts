import * as amx from "@sa-mp/amx";
import {Player, Position} from "@sa-mp/core";
import {constants} from "./constants";
import {StreamerTypes, StreamerItem} from ".";

export interface StreamerNearbyItemsOptions extends Position {
    type: StreamerTypes;
    maxItems: number; 
    range?: number; 
    world?: number;
}

export class StreamerFunctions {
    public static readonly constants = constants;

    public static custom(x: number): number {
        return x | 0x40000000 & ~0x80000000;
    }

    public static get tickRate(): number {
        return amx.callNative("Streamer_GetTickRate", "").retval;
    }

    public static set tickRate(rate: number) {
        amx.callNative("Streamer_SetTickRate", "i", rate);
    }

    public static toggleChunkStream(toggle: boolean): void {
        amx.callNative("Streamer_ToggleChunkStream", "i", Number(toggle));
    }

    public static isToggleChunkStream(): boolean {
        return Boolean(amx.callNative("Streamer_IsToggleChunkStream", "").retval);
    }

    public static getChunkTickRate(type: StreamerTypes, player: Player = new Player(-1)): number {
        return amx.callNative("Streamer_GetChunkTickRate", "ii", type, player.id).retval;
    }

    public static setChunkTickRate(type: StreamerTypes, rate: number, player: Player = new Player(-1)): boolean {
        return Boolean(amx.callNative("Streamer_SetChunkTickRate", "iii", type, rate, player.id).retval);
    }

    public static getChunkSize(type: StreamerTypes): number {
        return amx.callNative("Streamer_GetChunkSize", "i", type).retval;
    }

    public static setChunkSize(type: StreamerTypes, size: number): boolean {
        return Boolean(amx.callNative("Streamer_SetChunkSize", "ii", type, size).retval);
    }

    public static getMaxItems(type: StreamerTypes): number {
        return amx.callNative("Streamer_GetMaxItems", "i", type).retval;
    }

    public static setMaxItems(type: StreamerTypes, items: number): boolean {
        return Boolean(amx.callNative("Streamer_SetMaxItems", "ii", type, items).retval);
    }

    public static getVisibleItems(type: StreamerTypes, player: Player = new Player(-1)): number {
        return amx.callNative("Streamer_GetVisibleItems", "ii", type, player.id).retval;
    }

    public static setVisibleItems(type: StreamerTypes, items: number, player: Player = new Player(-1)): boolean {
        return Boolean(amx.callNative("Streamer_SetVisibleItems", "iii", type, items, player.id).retval);
    }

    public static getRadiusMultiplier(type: StreamerTypes, player: Player = new Player(-1)): number {
        const [multiplier] = amx.callNative("Streamer_GetRadiusMultiplier", "iFi", type, player.id);
        return multiplier as number;
    }

    public static setRadiusMultiplier(type: StreamerTypes, multiplier: number, player: Player = new Player(-1)): boolean {
        return Boolean(amx.callNative("Streamer_SetRadiusMultiplier", "ifi", type, multiplier, player.id).retval);
    }

    public static getTypePriority(max: number): StreamerTypes[] {
        const [types] = amx.callNative("Streamer_GetTypePriority", "Ai", max, max);
        return types as StreamerTypes[];
    }

    public static setTypePriority(types: StreamerTypes[]): boolean {
        return Boolean(amx.callNative("Streamer_SetTypePriority", "ai", types, types.length).retval);
    }

    public static get cellDistance(): number {
        const [distance] = amx.callNative("Streamer_GetCellDistance", "F");
        return distance as number;
    }

    public static set cellDistance(distance: number) {
        amx.callNative("Streamer_SetCellDistance", "f", distance);
    }

    public static get cellSize(): number {
        const [size] = amx.callNative("Streamer_GetCellSize", "F"); 
        return size as number;
    }

    public static set cellSize(size: number) {
        amx.callNative("Streamer_SetCellSize", "f", size);
    }

    public static toggleErrorCallback(toggle: boolean): void {
        amx.callNative("Streamer_ToggleErrorCallback", "i", Number(toggle));
    }

    public static isToggleErrorCallback(): boolean {
        return Boolean(amx.callNative("Streamer_IsToggleErrorCallback", "").retval);
    }

    public static amxUnloadDestroyItems(toggle: boolean): boolean {
        return Boolean(amx.callNative("Streamer_AmxUnloadDestroyItems", "i", Number(toggle)).retval);
    }

    public static processActiveItems(): void {
        amx.callNative("Streamer_ProcessActiveItems", "");
    }

    public static getLastUpdateTime(): number {
        const [time] = amx.callNative("Streamer_GetLastUpdateTime", "F");
        return time as number;
    }

    public static getUpperBound(type: StreamerTypes): number {
        return amx.callNative("Streamer_GetUpperBound", "i", type).retval;
    }

    public static toggleAllItems(player: Player, type: StreamerTypes, toggle: boolean, exceptions: number[] = [-1]): boolean {
        return Boolean(amx.callNative("Streamer_ToggleAllItems", "iiiai", player.id, type, Number(toggle), exceptions, exceptions.length).retval);
    }

    public static getItem(player: Player, type: StreamerTypes, internal: {id: number}): StreamerItem {
        return StreamerItem.get(type, amx.callNative("Streamer_GetItemStreamerID", "iii", player.id, type, internal.id).retval);
    }

    public static destroyAllVisibleItems(player: Player, type: StreamerTypes, serverwide: boolean = true): boolean {
        return Boolean(amx.callNative("Streamer_DestroyAllVisibleItems", "iii", player.id, type, Number(serverwide)).retval);
    }

    public static countVisibleItems(player: Player, type: StreamerTypes, serverwide: boolean = true): number {
        return amx.callNative("Streamer_CountVisibleItems", "iii", player.id, type, Number(serverwide)).retval;
    }

    public static destroyAllItems(type: StreamerTypes, serverwide: boolean = true): boolean {
        return Boolean(amx.callNative("Streamer_DestroyAllItems", "ii", type, Number(serverwide)).retval);
    }

    public static countItems(type: StreamerTypes, serverwide: boolean = true): number {
        return amx.callNative("Streamer_CountItems", "ii", type, Number(serverwide)).retval;
    }

    public static getNearbyItems({x, y, z, type, maxItems, range = 300.0, world = -1}: StreamerNearbyItemsOptions): number[] {
        const [items] = amx.callNative("Streamer_GetNearbyItems", "fffiAifi", x, y, z, type, maxItems, maxItems, range, world);
        return items as number[];
    }
}