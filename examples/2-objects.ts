import {GameMode, Group, Player, Weapons} from "@sa-mp/core";
import {DynamicObject} from "@sa-mp/streamer";

const objects: Group<DynamicObject> = new Group(
    new DynamicObject({model: 1331, x: 1655.7761, y: -1842.0952, z: 13.5463, rot: {x: 0, y: 0, z: 0}}),
    new DynamicObject({model: 1331, x: 1653.7761, y: -1842.0952, z: 13.5463, rot: {x: 10, y: 0, z: 0}}),
    new DynamicObject({model: 1331, x: 1651.7761, y: -1842.0952, z: 13.5463, rot: {x: 20, y: 0, z: 0}}),
    new DynamicObject({model: 1331, x: 1649.7761, y: -1842.0952, z: 13.5463, rot: {x: 30, y: 0, z: 0}}),
    new DynamicObject({model: 1331, x: 1647.7761, y: -1842.0952, z: 13.5463, rot: {x: 40, y: 0, z: 0}})
);

GameMode.on("init", () => {
    const object: DynamicObject = DynamicObject.create({model: 1334, x: 1657.7761, y: -1842.0952, z: 13.5463, rot: {x: 1, y: 2, z: 3}});
    console.log("Id: ", object.id, ".");
    console.log("Position: ", object.pos, ".");
    console.log("Rotation: ", object.rot, ".");
    objects.create();
    Player.addClass({skin: 100, spawn: {x: 1657.7761, y: -1842.0952, z: 13.5463}, angle: 0, weapons: [{type: Weapons.AK47, ammo: 89}]});
});