import * as amx from "@sa-mp/amx";
import {Group, Player, Position} from "@sa-mp/core";
import {StreamerTypes, DynamicObject, DynamicCP, DynamicRaceCP, DynamicArea, StreamerItem, DynamicActor} from "..";

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

    public attachCamera(object: DynamicObject): void {
        amx.callNative("AttachCameraToDynamicObject", "ii", this.player.id, object.id);
    }

    public get cameraTargetObject(): DynamicObject {
        return DynamicObject.getById(amx.callNative("GetPlayerCameraTargetDynObject", "i", this.player.id).retval);
    }

    public isInCheckpoint(checkpoint: DynamicCP): boolean {
        return Boolean(amx.callNative("IsPlayerInDynamicCP", "ii", this.player.id, checkpoint.id).retval);
    }

    public getVisibleCheckpoint(): DynamicCP {
        return DynamicCP.getById(amx.callNative("GetPlayerVisibleDynamicCP", "i", this.player.id).retval);
    }

    public isInRaceCheckpoint(checkpoint: DynamicRaceCP): boolean {
        return Boolean(amx.callNative("IsPlayerInDynamicRaceCP", "ii", this.player.id, checkpoint.id).retval);
    }

    public getVisibleRaceCheckpoint(): DynamicRaceCP {
        return DynamicRaceCP.getById(amx.callNative("GetPlayerVisibleDynamicRaceCP", "i", this.player.id).retval);
    }

    public isInArea(area: DynamicArea, recheck: number = 0): boolean {
        return Boolean(amx.callNative("IsPlayerInDynamicArea", "iii", this.player.id, area.id, recheck).retval);
    }

    public isInAnyArea(recheck: number = 0): boolean {
        return Boolean(amx.callNative("IsPlayerInAnyDynamicArea", "ii", this.player.id, recheck).retval);
    }

    public getAreas(max: number): Group<DynamicArea> {
        const [nativeAreas] = amx.callNative("GetPlayerDynamicAreas", "iAi", this.player.id, max, max) as unknown as [number[]];
        const result: Group<DynamicArea> = new Group;
        for(const id of nativeAreas)
            result.push(DynamicArea.getById(id));
        return result;
    }

    public getNumberAreas(): number {
        return amx.callNative("GetPlayerNumberDynamicAreas", "i", this.player.id).retval;
    }

    public get targetActor(): DynamicActor {
        return DynamicActor.getById(amx.callNative("GetPlayerTargetDynamicActor", "i", this.player.id).retval);
    }

    public get cameraTargetActor(): DynamicActor {
        return DynamicActor.getById(amx.callNative("GetPlayerCameraTargetDynActor", "i", this.player.id).retval);
    }

    public toggleCheckpoint(checkpoint: DynamicCP, toggle: boolean): void {
        amx.callNative("TogglePlayerDynamicCP", "iii", this.player.id, checkpoint.id, Number(toggle));
    }

    public toggleAllCheckpoints(toggle: boolean, exceptions: DynamicCP[] = [DynamicCP.getById(-1)]): void {
        amx.callNative("TogglePlayerAllDynamicCPs", "iiai", this.player.id, Number(toggle), exceptions.map(({id}) => id), exceptions.length);
    }

    public toggleRaceCheckpoint(checkpoint: DynamicRaceCP, toggle: boolean): void {
        amx.callNative("TogglePlayerDynamicRaceCP", "iii", this.player.id, checkpoint.id, Number(toggle));
    }

    public toggleAllRaceCheckpoints(toggle: boolean, exceptions: DynamicRaceCP[] = [DynamicRaceCP.getById(-1)]): void {
        amx.callNative("TogglePlayerAllDynamicRaceCPs", "iiai", this.player.id, Number(toggle), exceptions.map(({id}) => id), exceptions.length);
    }

    public toggleArea(area: DynamicArea, toggle: boolean): void {
        amx.callNative("TogglePlayerDynamicArea", "iii", this.player.id, area.id, Number(toggle));
    }

    public toggleAllAreas(toggle: boolean, exceptions: DynamicArea[] = [DynamicArea.getById(-1)]): void {
        amx.callNative("TogglePlayerAllDynamicAreas", "iiai", this.player.id, Number(toggle), exceptions.map(({id}) => id), exceptions.length);
    }
}