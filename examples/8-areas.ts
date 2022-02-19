import {GameMode, GangZone, Player, Weapons} from "@sa-mp/core";
import {DynamicArea, DynamicRectangle} from "@sa-mp/streamer";

let militaryArea: DynamicArea;
let militaryZone: GangZone;

GameMode.on("init", () => {
    Player.addClass({skin: 100, spawn: {x: 1657.7761, y: -1842.0952, z: 13.5463}, angle: 0, weapons: []});
    militaryArea = DynamicRectangle.create({min: {x: 1655.7761, y: -1840.0952}, max: {x: 1555.7761, y: -1740.0952}});
    militaryZone = GangZone.create({min: {x: 1655.7761, y: -1840.0952}, max: {x: 1555.7761, y: -1740.0952}});
});

Player.on("connect", (player) => {
    militaryZone.show(player, 0x36d149AA);
});

DynamicArea.on("enter", (player, area) => {
    if(area.is(militaryArea))
        player.giveWeapon(Weapons.M4, 110);
});

DynamicArea.on("leave", (player, area) => {
    if(area.is(militaryArea))
        player.resetWeapons();
});