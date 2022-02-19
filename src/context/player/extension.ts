import {Player} from "@sa-mp/core";
import {StreamerPlayerContextEvents} from ".";
import {DynamicActor, DynamicArea, DynamicCP, DynamicObject, DynamicPickup, DynamicRaceCP, Streamer} from "../..";

export class StreamerPlayerExtension extends Player.Extension {
    public callEvent<EventName extends keyof StreamerPlayerContextEvents>(player: Player, name: EventName, ...args: Parameters<StreamerPlayerContextEvents[EventName]>): number | undefined {
        return this.factory.getPersonal(player).callEvent(name, ...args);
    }

    public create(): void {
        DynamicObject.on("edit", (player, object, response, offset, rot) => {
            object.retval = this.callEvent(player, "onEditDynamicObject", object, response, offset, rot);
        });
        DynamicObject.on("select", (player, object, model, pos) => {
            object.retval = this.callEvent(player, "onSelectDynamicObject", object, model, pos);
        });
        DynamicObject.on("shoot", (player, weapon, object, pos) => {
            object.retval = this.callEvent(player, "onShootDynamicObject", weapon, object, pos);
        });
        DynamicPickup.on("pick-up", (player, pickup) => {
            pickup.retval = this.callEvent(player, "onPickUpDynamicPickup", pickup);
        });
        DynamicCP.on("enter", (player, checkpoint) => {
            checkpoint.retval = this.callEvent(player, "onEnterDynamicCP", checkpoint);
        });
        DynamicCP.on("leave", (player, checkpoint) => {
            checkpoint.retval = this.callEvent(player, "onLeaveDynamicCP", checkpoint);
        });
        DynamicRaceCP.on("enter", (player, checkpoint) => {
            checkpoint.retval = this.callEvent(player, "onEnterDynamicRaceCP", checkpoint);
        });
        DynamicRaceCP.on("leave", (player, checkpoint) => {
            checkpoint.retval = this.callEvent(player, "onLeaveDynamicRaceCP", checkpoint);
        });
        DynamicArea.on("enter", (player, area) => {
            area.retval = this.callEvent(player, "onEnterDynamicArea", area);
        });
        DynamicArea.on("leave", (player, area) => {
            area.retval = this.callEvent(player, "onLeaveDynamicArea", area);
        });
        DynamicActor.on("give-damage", (player, actor, amount, weapon, bodyPart) => {
            actor.retval = this.callEvent(player, "onGiveDamageDynamicActor", actor, amount, weapon, bodyPart);
        });
        DynamicActor.on("stream-in", (actor, forPlayer) => {
            actor.retval = this.callEvent(forPlayer, "onDynamicActorStreamIn", actor);
        });
        DynamicActor.on("stream-out", (actor, forPlayer) => {
            actor.retval = this.callEvent(forPlayer, "onDynamicActorStreamOut", actor);
        });
        Streamer.on("item-stream-in", (streamer, item, forPlayer) => {
            streamer.retval = this.callEvent(forPlayer, "onStreamerItemStreamIn", streamer, item);
        });
        Streamer.on("item-stream-out", (streamer, item, forPlayer) => {
            streamer.retval = this.callEvent(forPlayer, "onStreamerItemStreamOut", streamer, item);
        });
    }
}