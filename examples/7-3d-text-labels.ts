import {GameMode, Group, Player, Weapons} from "@sa-mp/core";
import {Dynamic3DTextLabel} from "@sa-mp/streamer";

GameMode.on("init", () => {
    Dynamic3DTextLabel.create({text: "Hello!", color: 0xf55a42AA, drawDistance: 10, x: 1653.7761, y: -1842.0952, z: 13.5463});
    const messages: Group<Dynamic3DTextLabel> = new Group(
        new Dynamic3DTextLabel({text: "Message #1!", color: 0xf5b942AA, drawDistance: 10, x: 1650.7761, y: -1842.0952, z: 13.5463}),
        new Dynamic3DTextLabel({text: "Message #2!", color: 0xf5b942AA, drawDistance: 10, x: 1648.7761, y: -1842.0952, z: 13.5463}),
        new Dynamic3DTextLabel({text: "Message #3!", color: 0xf5b942AA, drawDistance: 10, x: 1646.7761, y: -1842.0952, z: 13.5463}),
        new Dynamic3DTextLabel({text: "Message #4!", color: 0xf5b942AA, drawDistance: 10, x: 1644.7761, y: -1842.0952, z: 13.5463}),
        new Dynamic3DTextLabel({text: "Message #5!", color: 0xf5b942AA, drawDistance: 10, x: 1642.7761, y: -1842.0952, z: 13.5463}),
        new Dynamic3DTextLabel({text: "Message #6!", color: 0xf5b942AA, drawDistance: 10, x: 1640.7761, y: -1842.0952, z: 13.5463})
    );
    messages.create();
    Player.addClass({skin: 100, spawn: {x: 1657.7761, y: -1842.0952, z: 13.5463}, angle: 0, weapons: [{type: Weapons.KATANA, ammo: 89}, {type: Weapons.M4, ammo: 110}]});
});