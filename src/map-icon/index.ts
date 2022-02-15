import {MapIconStyle, Player, Position} from "@sa-mp/core";
import * as amx from "@sa-mp/amx";
import {DynamicArea, Streamer} from "..";

export interface DynamicMapIconOptions extends Position {
    type: number;
    color: number;
    world?: number;
    interior?: number; 
    player?: Player;
    streamDistance?: number;
    style?: MapIconStyle;
    area?: DynamicArea;
    priority?: number;
}

export class DynamicMapIcon {
    public static create(options: DynamicMapIconOptions): DynamicMapIcon {
        const icon = new DynamicMapIcon(options);
        return icon.create();
    }

    public static getById(id: number): DynamicMapIcon {
        return new DynamicMapIcon(id);
    }

    public static isValid(icon: DynamicMapIcon): boolean {
        return Boolean(amx.callNative("IsValidDynamicMapIcon", "i", icon.id).retval);
    }

    public id: number = Streamer.constants.INVALID_ID;

    constructor(public readonly idOrOptions: number | DynamicMapIconOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    } 

    public create(): DynamicMapIcon {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: DynamicMapIconOptions = this.idOrOptions;
        const {
            x, 
            y, 
            z, 
            type, 
            color, 
            world = -1, 
            interior = -1, 
            player = Player.getById(-1), 
            streamDistance = Streamer.constants.MAP_ICON_SD, 
            style = MapIconStyle.LOCAL, 
            area = DynamicArea.getById(-1), 
            priority = 0
        } = options;
        this.id = amx.callNative("CreateDynamicMapIcon", "fffiiiiifiii", x, y, z, type, color, world, interior, player.id, streamDistance, style, area.id, priority).retval;
        return this;
    }

    public destroy(): void {
        amx.callNative("DestroyDynamicMapIcon", "i", this.id);
    }
}