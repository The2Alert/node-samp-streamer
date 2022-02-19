import {EditObjectResponse, Player, Position, Weapons} from "@sa-mp/core";
import {DynamicActor, DynamicArea, DynamicCP, DynamicObject, DynamicPickup, DynamicRaceCP, Streamer, StreamerItem} from "../..";

export interface OnDynamicObjectMoved {
    onDynamicObjectMoved(object: DynamicObject): any;
}

export interface OnPlayerEditDynamicObject {
    onPlayerEditDynamicObject(player: Player, object: DynamicObject, response: EditObjectResponse, offset: Position, rot: Position): any;
}

export interface OnPlayerSelectDynamicObject {
    onPlayerSelectDynamicObject(player: Player, object: DynamicObject, model: number, pos: Position): any;
}

export interface OnPlayerShootDynamicObject {
    onPlayerShootDynamicObject(player: Player, weapon: Weapons, object: DynamicObject, pos: Position): any;
}

export interface OnPlayerPickUpDynamicPickup {
    onPlayerPickUpDynamicPickup(player: Player, pickup: DynamicPickup): any;
}

export interface OnPlayerEnterDynamicCP {
    onPlayerEnterDynamicCP(player: Player, checkpoint: DynamicCP): any;
}

export interface OnPlayerLeaveDynamicCP {
    onPlayerLeaveDynamicCP(player: Player, checkpoint: DynamicCP): any;
}

export interface OnPlayerEnterDynamicRaceCP {
    onPlayerEnterDynamicRaceCP(player: Player, checkpoint: DynamicRaceCP): any;
}

export interface OnPlayerLeaveDynamicRaceCP {
    onPlayerLeaveDynamicRaceCP(player: Player, checkpoint: DynamicRaceCP): any;
}

export interface OnPlayerEnterDynamicArea {
    onPlayerEnterDynamicArea(player: Player, area: DynamicArea): any;
}

export interface OnPlayerLeaveDynamicArea {
    onPlayerLeaveDynamicArea(player: Player, area: DynamicArea): any;
}

export interface OnPlayerGiveDamageDynamicActor {
    onPlayerGiveDamageDynamicActor(player: Player, actor: DynamicActor, amount: number, weapon: Weapons, bodyPart: number): any;
}

export interface OnDynamicActorStreamIn {
    onDynamicActorStreamIn(actor: DynamicActor, forPlayer: Player): any;
}

export interface OnDynamicActorStreamOut {
    onDynamicActorStreamOut(actor: DynamicActor, forPlayer: Player): any;
}

export interface OnStreamerItemStreamIn {
    onStreamerItemStreamIn(streamer: Streamer, item: StreamerItem, forPlayer: Player): any;
}

export interface OnStreamerItemStreamOut {
    onStreamerItemStreamOut(streamer: Streamer, item: StreamerItem, forPlayer: Player): any;
}

export interface OnStreamerPluginError {
    onStreamerPluginError(streamer: Streamer, error: Error): any;
}

export interface StreamerGameModeContextEvents extends OnDynamicObjectMoved, OnPlayerEditDynamicObject, OnPlayerSelectDynamicObject, OnPlayerShootDynamicObject, OnPlayerPickUpDynamicPickup, OnPlayerEnterDynamicCP, OnPlayerLeaveDynamicCP, OnPlayerEnterDynamicRaceCP, OnPlayerLeaveDynamicRaceCP, OnPlayerEnterDynamicArea, OnPlayerLeaveDynamicArea, OnPlayerGiveDamageDynamicActor, OnDynamicActorStreamIn, OnDynamicActorStreamOut, OnStreamerItemStreamIn, OnStreamerItemStreamOut, OnStreamerPluginError {}