import * as amx from "@sa-mp/amx";
import {MapIconStyle, Player, Position} from "@sa-mp/core";
import {DynamicMapIcon} from ".";
import {DynamicArea, Streamer} from "..";

export interface DynamicMapIconExOptions extends Position {
    type: number;
    color: number;
    style?: MapIconStyle;
    streamDistance?: number;
    worlds?: number[];
    interiors?: number[];
    players?: Player[];
    areas?: DynamicArea[];
    priority?: number;
}

export class DynamicMapIconEx extends DynamicMapIcon {
    public static create(options: DynamicMapIconExOptions): DynamicMapIconEx {
        const icon = new DynamicMapIconEx(options);
        return icon.create();
    }

    constructor(public readonly options: DynamicMapIconExOptions) {
        super(Streamer.constants.INVALID_ID);
    }

    public create(): DynamicMapIconEx {
        const {
            x, 
            y, 
            z, 
            type, 
            color, 
            style = MapIconStyle.LOCAL, 
            streamDistance = Streamer.constants.MAP_ICON_SD, 
            worlds = [-1], 
            interiors = [-1], 
            players = [Player.getById(-1)], 
            areas = [DynamicArea.getById(-1)], 
            priority = 0
        } = this.options;
        const maxWorlds: number = worlds.length; 
        const maxInteriors: number = interiors.length; 
        const maxPlayers: number = players.length;
        const maxAreas: number = areas.length;
        this.id = amx.callNative(
            "CreateDynamicMapIconEx",
            "fffiiifaaaaiiiii",
            x, 
            y, 
            z, 
            type, 
            color, 
            style, 
            streamDistance, 
            worlds, 
            interiors, 
            players.map(({id}) => id), 
            areas.map(({id}) => id), 
            priority, 
            maxWorlds, 
            maxInteriors, 
            maxPlayers, 
            maxAreas
        ).retval;
        return this;
    }
}