import {GameMode, Player, Weapons} from "@sa-mp/core";
import {Dynamic3DTextLabel, DynamicActor} from "@sa-mp/streamer";

GameMode.on("init", () => {
    Player.addClass({skin: 100, spawn: {x: 1657.7761, y: -1842.0952, z: 13.5463}, angle: 0, weapons: [{type: Weapons.KATANA, ammo: 1}]});
    DynamicActor.create({model: 101, x: 1653.7761, y: -1842.0952, z: 13.5463, rotation: 0, world: 0});
    Dynamic3DTextLabel.create({text: "dev2alert", color: 0xffffffAA, drawDistance: 20, x: 1653.7761, y: -1842.0952, z: 14.5463});
    Dynamic3DTextLabel.create({text: "Creator NodeSamp!", color: 0xcbd4d4AA, drawDistance: 20, x: 1653.7761, y: -1842.0952, z: 14.6463});
});