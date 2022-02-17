import * as amx from "@sa-mp/amx";
import {constants, Player, Position, Vehicle} from "@sa-mp/core";
import {Dynamic3DTextLabel} from ".";
import {DynamicArea, Streamer} from "..";

export interface Dynamic3DTextLabelExOptions extends Position {
    text: string;
    color: number;
    drawDistance: number;
    attachedPlayer?: Player;
    attachedVehicle?: Vehicle;
    testLOS?: boolean;
    streamDistance?: number;
    worlds?: number[];
    interiors?: number[];
    players?: Player[];
    areas?: DynamicArea[];
    priority?: number;
}

export class Dynamic3DTextLabelEx extends Dynamic3DTextLabel {
    public static create(options: Dynamic3DTextLabelExOptions): Dynamic3DTextLabelEx {
        const text = new Dynamic3DTextLabelEx(options);
        return text.create();
    } 

    constructor(public readonly options: Dynamic3DTextLabelExOptions) {
        super(Streamer.constants.INVALID_ID);
    }

    public create(): Dynamic3DTextLabelEx {
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
            streamDistance = Streamer.constants.TEXT_3D_LABEL_SD, 
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
            "CreateDynamic3DTextLabelEx",
            "siffffiiifaaaaiiiii",
            text, 
            color, 
            x, 
            y, 
            z, 
            drawDistance, 
            attachedPlayer.id, 
            attachedVehicle.id, 
            Number(testLOS), 
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