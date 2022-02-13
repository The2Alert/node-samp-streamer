import * as amx from "@sa-mp/amx";
import {ObjectMaterialSize, ObjectMaterialTextAlignments, Player, Position, Vehicle} from "@sa-mp/core"
import {DynamicArea, Streamer, DynamicObject, StreamerItem, StreamerTypes} from "..";

export interface DynamicObjectOptions extends Position {
    model: number;
    rot: Position;
    world?: number;
    interior?: number; 
    player?: Player;
    streamDistance?: number; 
    drawDistance?: number;
    area?: DynamicArea; 
    priority?: number;
    attach?: DynamicObjectAttachOptions;
}

export interface MoveDynamicObjectOptions extends Position { 
    speed: number 
    rot?: Position;
}

export interface DynamicObjectAttachOptions {
    offset: Position; 
    rot: Position; 
    syncRotation?: boolean;
}

export interface GetDynamicObjectMaterialOptions {
    index: number;
    maxTxdName: number; 
    maxTextureName: number;
}

export interface GetDynamicObjectMaterialResult {
    model: number; 
    txdName: string; 
    textureName: string; 
    color: number;
}

export interface DynamicObjectMaterialOptions {
    index: number;
    model: number;
    txdName: string;
    textureName: string; 
    color?: number;
}

export interface GetDynamicObjectMaterialTextOptions {
    index: number;
    maxText: number; 
    maxFontFace: number;
}

export interface GetDynamicObjectMaterialTextResult {
    text: string;
    size: ObjectMaterialSize; 
    fontFace: string;
    fontSize: number; 
    bold: boolean;
    color: number;
    backgroundColor: number; 
    align: ObjectMaterialTextAlignments;
}

export interface DynamicObjectMaterialTextOptions {
    index: number; 
    text: string; 
    size?: ObjectMaterialSize;
    fontFace?: string; 
    fontSize?: number; 
    bold?: boolean;
    color?: number; 
    backgroundColor?: number; 
    align?: ObjectMaterialTextAlignments;
}

export class DynamicObjectFunctions {
    public static create(options: DynamicObjectOptions): DynamicObject {
        const object = new DynamicObject(options);
        return object.create();
    }

    public static getById(id: number): DynamicObject {
        return new DynamicObject(id);
    }

    public static isValid(object: DynamicObject): boolean {
        return Boolean(amx.callNative("IsValidDynamicObject", "i", object.id).retval);
    }

    public id: number = Streamer.constants.INVALID_ID;

    constructor(public readonly idOrOptions: number | DynamicObjectOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): DynamicObject {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: DynamicObjectOptions = this.idOrOptions;
        const {
            model, 
            x, 
            y, 
            z, 
            rot, 
            world = -1, 
            interior = -1, 
            player = Player.getById(-1), 
            streamDistance = Streamer.constants.OBJECT_SD, 
            drawDistance = Streamer.constants.OBJECT_DD, 
            area = DynamicArea.getById(-1), 
            priority = 0
        } = options;
        this.id = amx.callNative("CreateDynamicObject", "iffffffiiiffii", model, x, y, z, rot.x, rot.y, rot.z, world, interior, player.id, streamDistance, drawDistance, area.id, priority).retval;
        return this;
    }

    public destroy(): void {
        amx.callNative("DestroyDynamicObject", "i", this.id);
    }

    public get pos(): Position {
        const [x, y, z] = amx.callNative("GetDynamicObjectPos", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public set pos({x, y, z}: Position) {
        amx.callNative("SetDynamicObjectPos", "ifff", this.id, x, y, z);
    }

    public get rot(): Position {
        const [x, y, z] = amx.callNative("GetDynamicObjectRot", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public set rot({x, y, z}: Position) {
        amx.callNative("SetDynamicObjectRot", "ifff", this.id, x, y, z);
    }

    public noCameraCol(): boolean {
        return Boolean(amx.callNative("SetDynamicObjectNoCameraCol", "i", this.id).retval);
    }

    public getNoCameraCol(): boolean {
        return Boolean(amx.callNative("GetDynamicObjectNoCameraCol", "i", this.id).retval);
    }

    public move({x, y, z, speed, rot = {x: -1000.0, y: -1000.0, z: -1000.0}}: MoveDynamicObjectOptions): void {
        amx.callNative("MoveDynamicObject", "ifffffff", this.id, x, y, z, speed, rot.x, rot.y, rot.z);
    }

    public stop(): void {
        amx.callNative("StopDynamicObject", "i", this.id);
    }

    public moving(): boolean {
        return Boolean(amx.callNative("IsDynamicObjectMoving", "i", this.id).retval);
    }

    public attach(attached: DynamicObject | Player | Vehicle, options?: DynamicObjectAttachOptions): void {
        if(attached instanceof DynamicObject) {
            let attachedOptions: DynamicObjectAttachOptions | undefined;
            if(typeof attached.idOrOptions === "object")
                attachedOptions = attached.idOrOptions.attach;
            const {offset, rot, syncRotation = true}: DynamicObjectAttachOptions = options ?? attachedOptions ?? {offset: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}};
            amx.callNative("AttachDynamicObjectToObject", "iiffffffi", this.id, attached.id, offset.x, offset.y, offset.z, rot.x, rot.y, rot.z, Number(syncRotation));
        } else if(attached instanceof Player) {
            const {offset, rot}: DynamicObjectAttachOptions = options ?? {offset: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}};
            amx.callNative("AttachDynamicObjectToPlayer", "iiffffff", this.id, attached.id, offset.x, offset.y, offset.z, rot.x, rot.y, rot.z);
        } else if(attached instanceof Vehicle) {
            let attachedOptions: DynamicObjectAttachOptions | undefined;
            if(typeof attached.idOrOptions === "object")
                attachedOptions = attached.idOrOptions.attach;
            const {offset, rot}: DynamicObjectAttachOptions = options ?? attachedOptions ?? {offset: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}};
            amx.callNative("AttachDynamicObjectToVehicle", "iiffffff", this.id, attached.id, offset.x, offset.y, offset.z, rot.x, rot.y, rot.z);
        }
    }

    public edit(player: Player): void {
        amx.callNative("EditDynamicObject", "ii", player.id, this.id);
    }

    public isMaterialUsed(index: number): boolean {
        return Boolean(amx.callNative("IsDynamicObjectMaterialUsed", "ii", this.id, index).retval);
    }

    public removeMaterial(index: number): void {
        amx.callNative("RemoveDynamicObjectMaterial", "ii", this.id, index);
    }

    public getMaterial({index, maxTxdName, maxTextureName}: GetDynamicObjectMaterialOptions): GetDynamicObjectMaterialResult {
        const [model, txdName, textureName, color] = amx.callNative("GetDynamicObjectMaterial", "iiISSIii", this.id, index, maxTxdName, maxTextureName, maxTxdName, maxTextureName) as unknown as [number, string, string, number];
        return {model, txdName, textureName, color};
    }

    public material({index, model, txdName, textureName, color = 0}: DynamicObjectMaterialOptions): void {
        amx.callNative("SetDynamicObjectMaterial", "iiissi", this.id, index, model, txdName, textureName, color);
    }

    public isMaterialTextUsed(index: number): boolean {
        return Boolean(amx.callNative("IsDynamicObjectMaterialTextUsed", "ii", this.id, index).retval);
    }

    public removeMaterialText(index: number): void {
        amx.callNative("RemoveDynamicObjectMaterialText", "ii", this.id, index);
    }

    public getMaterialText({index, maxText, maxFontFace}: GetDynamicObjectMaterialTextOptions): GetDynamicObjectMaterialTextResult {
        const [text, size, fontFace, fontSize, bold, color, backgroundColor, align] = amx.callNative("GetDynamicObjectMaterialText", "iiSISIIIIIii", this.id, index, maxText, maxFontFace, maxText, maxFontFace) as unknown as [string, number, string, number, number, number, number, number];
        return {text, size, fontFace, fontSize, bold: Boolean(bold), color, backgroundColor, align};
    }

    public materialText({index, text, size = ObjectMaterialSize["256x128"], fontFace = "Arial", fontSize = 24, bold = true, color = 0xFFFFFFFF, backgroundColor = 0, align = ObjectMaterialTextAlignments.LEFT}: DynamicObjectMaterialTextOptions): void {
        amx.callNative("SetDynamicObjectMaterialText", "iisisiiiii", this.id, index, text, size, fontFace, fontSize, Number(bold), color, backgroundColor, align);
    }

    public get item(): StreamerItem {
        return StreamerItem.get(StreamerTypes.OBJECT, this.id);
    }
}