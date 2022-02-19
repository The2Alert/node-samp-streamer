import {GameMode} from "@sa-mp/core";
import {DynamicActor, DynamicArea, DynamicCP, DynamicObject, DynamicPickup, DynamicRaceCP, Streamer} from "../..";
import {StreamerGameModeContextEvents} from "./context-events";

export class StreamerGameModeExtension extends GameMode.Extension {
    public callEvent<EventName extends keyof StreamerGameModeContextEvents>(name: EventName, ...args: Parameters<StreamerGameModeContextEvents[EventName]>): number | undefined {
        return this.factory.callEvent(name, ...args);
    }

    public create(): void {
        DynamicObject.on("moved", (object) => {
            object.retval = this.callEvent("onDynamicObjectMoved", object);
        });
        DynamicObject.on("edit", (player, object, response, offset, rot) => {
            object.retval = this.callEvent("onPlayerEditDynamicObject", player, object, response, offset, rot);
        });
        DynamicObject.on("select", (player, object, model, pos) => {
            object.retval = this.callEvent("onPlayerSelectDynamicObject", player, object, model, pos);
        });
        DynamicObject.on("shoot", (player, weapon, object, pos) => {
            object.retval = this.callEvent("onPlayerShootDynamicObject", player, weapon, object, pos);
        });
        DynamicPickup.on("pick-up", (player, pickup) => {
            pickup.retval = this.callEvent("onPlayerPickUpDynamicPickup", player, pickup);
        });
        DynamicCP.on("enter", (player, checkpoint) => {
            checkpoint.retval = this.callEvent("onPlayerEnterDynamicCP", player, checkpoint);
        });
        DynamicCP.on("leave", (player, checkpoint) => {
            checkpoint.retval = this.callEvent("onPlayerLeaveDynamicCP", player, checkpoint);
        });
        DynamicRaceCP.on("enter", (player, checkpoint) => {
            checkpoint.retval = this.callEvent("onPlayerEnterDynamicRaceCP", player, checkpoint);
        });
        DynamicRaceCP.on("leave", (player, checkpoint) => {
            checkpoint.retval = this.callEvent("onPlayerLeaveDynamicRaceCP", player, checkpoint);
        });
        DynamicArea.on("enter", (player, area) => {
            area.retval = this.callEvent("onPlayerEnterDynamicArea", player, area);
        });
        DynamicArea.on("leave", (player, area) => {
            area.retval = this.callEvent("onPlayerLeaveDynamicArea", player, area);
        });
        DynamicActor.on("give-damage", (player, actor, amount, weapon, bodyPart) => {
            actor.retval = this.callEvent("onPlayerGiveDamageDynamicActor", player, actor, amount, weapon, bodyPart);
        });
        DynamicActor.on("stream-in", (actor, forPlayer) => {
            actor.retval = this.callEvent("onDynamicActorStreamIn", actor, forPlayer);
        });
        DynamicActor.on("stream-out", (actor, forPlayer) => {
            actor.retval = this.callEvent("onDynamicActorStreamOut", actor, forPlayer);
        });
        Streamer.on("item-stream-in", (streamer, item, forPlayer) => {
            streamer.retval = this.callEvent("onStreamerItemStreamIn", streamer, item, forPlayer);
        });
        Streamer.on("item-stream-out", (streamer, item, forPlayer) => {
            streamer.retval = this.callEvent("onStreamerItemStreamOut", streamer, item, forPlayer);
        });
        Streamer.on("plugin-error", (streamer, error) => {
            streamer.retval = this.callEvent("onStreamerPluginError", streamer, error); 
        });
    }
}