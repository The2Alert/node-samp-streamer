import {EventEmitter, DefaultEventMap} from "tsee";
import * as amx from "@sa-mp/amx";
import {EditObjectResponse, Player, Position, Weapons} from "@sa-mp/core";
import {DynamicObjectFunctions} from "./functions";

export interface DynamicObjectEventMap extends DefaultEventMap {
    moved: (object: DynamicObject) => any;
    edit: (player: Player, object: DynamicObject, response: EditObjectResponse, offset: Position, rot: Position) => any;
    select: (player: Player, object: DynamicObject, model: number, pos: Position) => any;
    shoot: (player: Player, weapon: Weapons, object: DynamicObject, pos: Position) => any;
}

export class DynamicObject extends DynamicObjectFunctions {
    public static readonly events: EventEmitter<DynamicObjectEventMap> = new EventEmitter;
    public static readonly on = DynamicObject.events.on;

    public static init(): void {
        amx.onPublicCall("OnDynamicObjectMoved", "i", (objectid) => {
            const object: DynamicObject = DynamicObject.getById(objectid as number);
            return DynamicObject.emit("moved", object, object);
        });
        amx.onPublicCall("OnPlayerEditDynamicObject", "iiiffffff", (playerid, objectid, response, x, y, z, rx, ry, rz) => {
            const player: Player = Player.getById(playerid as number);
            const object: DynamicObject = DynamicObject.getById(objectid as number);
            const offset: Position = {x: x as number, y: y as number, z: z as number};
            const rot: Position = {x: rx as number, y: ry as number, z: rz as number};
            return DynamicObject.emit("edit", object, player, object, response as EditObjectResponse, offset, rot);
        });
        amx.onPublicCall("OnPlayerSelectDynamicObject", "iiifff", (playerid, objectid, modelid, x, y, z) => {
            const player: Player = Player.getById(playerid as number);
            const object: DynamicObject = DynamicObject.getById(objectid as number);
            const pos: Position = {x: x as number, y: y as number, z: z as number};
            return DynamicObject.emit("select", object, player, object, modelid as number, pos);
        });
        amx.onPublicCall("OnPlayerShootDynamicObject", "iiifff", (playerid, weaponid, objectid, x, y, z) => {
            const player: Player = Player.getById(playerid as number);
            const object: DynamicObject = DynamicObject.getById(objectid as number);
            const pos: Position = {x: x as number, y: y as number, z: z as number};
            return DynamicObject.emit("shoot", object, player, weaponid as Weapons, object, pos);
        });
    }

    public static emit<EventKey extends keyof DynamicObjectEventMap>(key: EventKey, object: DynamicObject, ...args: Parameters<DynamicObjectEventMap[EventKey]>): number | void {
        DynamicObject.events.emit(key, ...args);
        const {retval} = object;
        if(typeof retval === "number")
            return retval;
    }

    public retval?: number;
}

DynamicObject.init();