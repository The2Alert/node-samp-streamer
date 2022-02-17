import * as amx from "@sa-mp/amx";
import {Group, Player, Position, Position2D, Vehicle, constants} from "@sa-mp/core";
import {StreamerItem, StreamerTypes, DynamicArea, Streamer, StreamerAreaTypes, DynamicObject, StreamerObjectTypes} from "..";

export interface DynamicAreaAttachOptions {
    offset: Position;
}

export class DynamicAreaFunctions {
    public static getById(id: number): DynamicArea {
        return new DynamicArea(id);
    }

    public static isValid(area: DynamicArea): boolean {
        return Boolean(amx.callNative("IsValidDynamicArea", "i", area.id).retval);
    }

    public static isAnyPlayerInAny(recheck: number = 0): boolean {
        return Boolean(amx.callNative("IsAnyPlayerInAnyDynamicArea", "i", recheck).retval);
    }

    public static isPointInAny({x, y, z}: Position): boolean {
        return Boolean(amx.callNative("IsPointInAnyDynamicArea", "fff", x, y, z).retval);
    }

    public static isLineInAny([{x: x1, y: y1, z: z1}, {x: x2, y: y2, z: z2}]: [Position, Position]): boolean {
        return Boolean(amx.callNative("IsLineInAnyDynamicArea", "ffffff", x1, y1, z1, x2, y2, z2).retval);
    }

    public static getForPoint({x, y, z}: Position, max: number): Group<DynamicArea> {
        const [nativeAreas] = amx.callNative("GetDynamicAreasForPoint", "fffAi", x, y, z, max, max) as unknown as [number[]];
        const result: Group<DynamicArea> = new Group;
        for(const id of nativeAreas)
            result.push(DynamicArea.getById(id));
        return result;
    }

    public static getNumberForPoint({x, y, z}: Position): number {
        return amx.callNative("GetNumberDynamicAreasForPoint", "fff", x, y, z).retval;
    }

    public static getForLine([{x: x1, y: y1, z: z1}, {x: x2, y: y2, z: z2}]: [Position, Position], max: number): Group<DynamicArea> {
        const [nativeAreas] = amx.callNative("GetDynamicAreasForLine", "ffffffAi", x1, y1, z1, x2, y2, z2, max, max) as unknown as [number[]];
        const result: Group<DynamicArea> = new Group;
        for(const id of nativeAreas)
            result.push(DynamicArea.getById(id));
        return result;
    }

    public static getNumberForLine([{x: x1, y: y1, z: z1}, {x: x2, y: y2, z: z2}]: [Position, Position]): number {
        return amx.callNative("GetNumberDynamicAreasForLine", "ffffff", x1, y1, z1, x2, y2, z2).retval;
    }

    public static destroyAll(): void {
        amx.callNative("DestroyAllDynamicAreas", "");
    }

    public static get count(): number {
        return amx.callNative("CountDynamicAreas", "").retval;
    }

    protected constructor(public id: number = Streamer.constants.INVALID_ID) {}

    public destroy(): void {
        amx.callNative("DestroyDynamicArea", "i", this.id);
    }

    public get type(): StreamerAreaTypes {
        return amx.callNative("GetDynamicAreaType", "i", this.id).retval;
    }

    public getPolygonPoints(max: number): Position2D[] {
        const maxPoints: number = max * 2;
        const [nativePoints] = amx.callNative("GetDynamicPolygonPoints", "iVi", this.id, maxPoints, maxPoints) as unknown as [number[]];
        const points: Position2D[] = [];
        for(let index = 0; index < maxPoints; index += 2)
            points.push({x: nativePoints[index], y: nativePoints[index + 1]});
        return points;
    }

    public getPolygonNumberPoints(): number {
        return amx.callNative("GetDynamicPolygonNumberPoints", "i", this.id).retval;
    }

    public isAnyPlayer(recheck: number = 0): boolean {
        return Boolean(amx.callNative("IsAnyPlayerInDynamicArea", "ii", this.id, recheck).retval);
    }

    public isPoint({x, y, z}: Position): boolean {
        return Boolean(amx.callNative("IsPointInDynamicArea", "ifff", this.id, x, y, z).retval);
    }

    public isLine([{x: x1, y: y1, z: z1}, {x: x2, y: y2, z: z2}]: [Position, Position]): boolean {
        return Boolean(amx.callNative("IsLineInDynamicArea", "iffffff", this.id, x1, y1, z1, x2, y2, z2).retval);
    }

    public attach(attached: DynamicObject | Player | Vehicle, options?: DynamicAreaAttachOptions): void {
        if(attached instanceof DynamicObject) {
            let attachedOptions: DynamicAreaAttachOptions | undefined;
            if(typeof attached.idOrOptions === "object")
                attachedOptions = attached.idOrOptions.attach;
            const {offset}: DynamicAreaAttachOptions = options ?? attachedOptions ?? {offset: {x: 0, y: 0, z: 0}};
            const type: StreamerObjectTypes = StreamerObjectTypes.DYNAMIC;
            const playerid: number = constants.INVALID_PLAYER_ID;
            amx.callNative("AttachDynamicAreaToObject", "iiiifff", this.id, attached.id, type, playerid, offset.x, offset.y, offset.z);
        } else if(attached instanceof Player) {
            const {offset}: DynamicAreaAttachOptions = options ?? {offset: {x: 0, y: 0, z: 0}};
            amx.callNative("AttachDynamicAreaToPlayer", "iifff", this.id, attached.id, offset.x, offset.y, offset.z);
        } else if(attached instanceof Vehicle) {
            let attachedOptions: DynamicAreaAttachOptions | undefined;
            if(typeof attached.idOrOptions === "object")
                attachedOptions = attached.idOrOptions.attach;
            const {offset}: DynamicAreaAttachOptions = options ?? attachedOptions ?? {offset: {x: 0, y: 0, z: 0}};
            amx.callNative("AttachDynamicAreaToVehicle", "iifff", this.id, attached.id, offset.x, offset.y, offset.z);
        }
    }

    public toggleSpectateMode(toggle: boolean): void {
        amx.callNative("ToggleDynAreaSpectateMode", "ii", this.id, Number(toggle));
    }

    public isToggleSpectateMode(): boolean {
        return Boolean(amx.callNative("IsToggleDynAreaSpectateMode", "i", this.id).retval);
    }

    public get item(): StreamerItem {
        return StreamerItem.get(StreamerTypes.AREA, this.id);
    }

    public is(area: DynamicArea): boolean {
        return this.id === area.id;
    }
}