import {Player, Position, Vehicle, constants} from "@sa-mp/core";
import * as amx from "@sa-mp/amx";
import {DynamicArea, Streamer, StreamerItem, StreamerTypes} from "..";

export interface Dynamic3DTextLabelOptions extends Position {
    text: string;
    color: number;
    drawDistance: number;
    attachedPlayer?: Player;
    attachedVehicle?: Vehicle;
    testLOS?: boolean;
    world?: number;
    interior?: number; 
    player?: Player;
    streamDistance?: number; 
    area?: DynamicArea; 
    priority?: number;
}

export class Dynamic3DTextLabel {
    public static create(options: Dynamic3DTextLabelOptions): Dynamic3DTextLabel {
        const text = new Dynamic3DTextLabel(options);
        return text.create();
    }

    public static getById(id: number): Dynamic3DTextLabel {
        return new Dynamic3DTextLabel(id);
    }

    public static isValid(text: Dynamic3DTextLabel): boolean {
        return Boolean(amx.callNative("IsValidDynamic3DTextLabel", "i", text.id).retval);
    }

    public static destroyAll(): void {
        amx.callNative("DestroyAllDynamic3DTextLabels", "");
    }

    public static get count(): number {
        return amx.callNative("CountDynamic3DTextLabels", "").retval;
    }

    public id: number = Streamer.constants.INVALID_ID;

    constructor(public readonly idOrOptions: number | Dynamic3DTextLabelOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): Dynamic3DTextLabel {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: Dynamic3DTextLabelOptions = this.idOrOptions;
        const {
            text,
            color, 
            x, 
            y, 
            z, 
            drawDistance, 
            attachedPlayer = Player.getById(constants.INVALID_PLAYER_ID), 
            attachedVehicle = Vehicle.getById(constants.INVALID_VEHICLE_ID), 
            testLOS = false,
            world = -1, 
            interior = -1, 
            player = Player.getById(-1), 
            streamDistance = Streamer.constants.TEXT_3D_LABEL_SD, 
            area = DynamicArea.getById(-1), 
            priority = 0
        } = options;
        this.id = amx.callNative("CreateDynamic3DTextLabel", "siffffiiiiiifii", text, color, x, y, z, drawDistance, attachedPlayer.id, attachedVehicle.id, Number(testLOS), world, interior, player.id, streamDistance, area.id, priority).retval;
        return this;
    }

    public destroy(): void {
        amx.callNative("DestroyDynamic3DTextLabel", "i", this.id);
    }

    public getText(max: number): string {
        const [text] = amx.callNative("GetDynamic3DTextLabelText", "iSi", this.id, max, max) as string[];
        return text;
    }

    public update(text: string, color: number = 0xFFFFFFAA): void {
        amx.callNative("UpdateDynamic3DTextLabelText", "iis", this.id, color, text);
    }

    public get item(): StreamerItem {
        return StreamerItem.get(StreamerTypes.TEXT_3D_LABEL, this.id);
    }

    public is(text: Dynamic3DTextLabel): boolean {
        return this.id === text.id;
    }
}