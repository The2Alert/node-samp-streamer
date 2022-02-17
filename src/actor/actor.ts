import {EventEmitter, DefaultEventMap} from "tsee";
import {Player, Weapons} from "@sa-mp/core";
import * as amx from "@sa-mp/amx";
import {DynamicActorFunctions} from "./functions";

export interface DynamicActorEventMap extends DefaultEventMap {
    "give-damage": (player: Player, actor: DynamicActor, amount: number, weapon: Weapons, bodyPart: number) => any;
    "stream-in": (actor: DynamicActor, forPlayer: Player) => any;
    "stream-out": (actor: DynamicActor, forPlayer: Player) => any;
}

export class DynamicActor extends DynamicActorFunctions {
    public static readonly events: EventEmitter<DynamicActorEventMap> = new EventEmitter;
    public static readonly on = DynamicActor.events.on;

    public static init(): void {
        amx.onPublicCall("OnPlayerGiveDamageDynamicActor", "iifii", (playerid, actorid, amount, weaponid, bodypart) => {
            const player: Player = Player.getById(playerid as number);
            const actor: DynamicActor = DynamicActor.getById(actorid as number);
            return DynamicActor.emit("give-damage", actor, player, actor, amount as number, weaponid as Weapons, bodypart as number);
        });
        amx.onPublicCall("OnDynamicActorStreamIn", "ii", (actorid, forplayerid) => {
            const actor: DynamicActor = DynamicActor.getById(actorid as number);
            const forPlayer: Player = Player.getById(forplayerid as number);
            return DynamicActor.emit("stream-in", actor, actor, forPlayer);
        });
        amx.onPublicCall("OnDynamicActorStreamOut", "ii", (actorid, forplayerid) => {
            const actor: DynamicActor = DynamicActor.getById(actorid as number);
            const forPlayer: Player = Player.getById(forplayerid as number);
            return DynamicActor.emit("stream-out", actor, actor, forPlayer);
        });
    }

    public static emit<EventKey extends keyof DynamicActorEventMap>(key: EventKey, actor: DynamicActor, ...args: Parameters<DynamicActorEventMap[EventKey]>): number | void {
        DynamicActor.events.emit(key, ...args);
        const {retval} = actor;
        if(typeof retval === "number")
            return retval;
    }

    public retval?: number;
}

DynamicActor.init();