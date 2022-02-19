import {EditObjectResponse, Position, Weapons} from "@sa-mp/core";
import {DynamicActor, DynamicArea, DynamicCP, DynamicObject, DynamicPickup, DynamicRaceCP, Streamer, StreamerItem} from "../..";

export interface OnEditDynamicObject {
    onEditDynamicObject(object: DynamicObject, response: EditObjectResponse, offset: Position, rot: Position): any;
}

export interface OnSelectDynamicObject {
    onSelectDynamicObject(object: DynamicObject, model: number, pos: Position): any;
}

export interface OnShootDynamicObject {
    onShootDynamicObject(weapon: Weapons, object: DynamicObject, pos: Position): any;
}

export interface OnPickUpDynamicPickup {
    onPickUpDynamicPickup(pickup: DynamicPickup): any;
}

export interface OnEnterDynamicCP {
    onEnterDynamicCP(checkpoint: DynamicCP): any;
}

export interface OnLeaveDynamicCP {
    onLeaveDynamicCP(checkpoint: DynamicCP): any;
}

export interface OnEnterDynamicRaceCP {
    onEnterDynamicRaceCP(checkpoint: DynamicRaceCP): any;
}

export interface OnLeaveDynamicRaceCP {
    onLeaveDynamicRaceCP(checkpoint: DynamicRaceCP): any;
}

export interface OnEnterDynamicArea {
    onEnterDynamicArea(area: DynamicArea): any;
}

export interface OnLeaveDynamicArea {
    onLeaveDynamicArea(area: DynamicArea): any;
}

export interface OnGiveDamageDynamicActor {
    onGiveDamageDynamicActor(actor: DynamicActor, amount: number, weapon: Weapons, bodyPart: number): any;
}

export interface PlayerOnDynamicActorStreamIn {
    onDynamicActorStreamIn(actor: DynamicActor): any;
}

export interface PlayerOnDynamicActorStreamOut {
    onDynamicActorStreamOut(actor: DynamicActor): any;
}

export interface PlayerOnStreamerItemStreamIn {
    onStreamerItemStreamIn(streamer: Streamer, item: StreamerItem): any;
}

export interface PlayerOnStreamerItemStreamOut {
    onStreamerItemStreamOut(streamer: Streamer, item: StreamerItem): any;
}

export interface StreamerPlayerContextEvents extends OnEditDynamicObject, OnSelectDynamicObject, OnShootDynamicObject, OnPickUpDynamicPickup, OnEnterDynamicCP, OnLeaveDynamicCP, OnEnterDynamicRaceCP, OnLeaveDynamicRaceCP, OnEnterDynamicArea, OnLeaveDynamicArea, OnGiveDamageDynamicActor, PlayerOnDynamicActorStreamIn, PlayerOnDynamicActorStreamOut, PlayerOnStreamerItemStreamIn, PlayerOnStreamerItemStreamOut {}