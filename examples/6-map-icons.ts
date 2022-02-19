import {GameMode, Group, Player, Weapons} from "@sa-mp/core";
import {DynamicMapIcon} from "@sa-mp/streamer";

GameMode.on("init", () => {
    DynamicMapIcon.create({x: 1657.7761, y: -1842.0952, z: 13.5463, type: 31, color: 0});
    const icons: Group<DynamicMapIcon> = new Group(
        new DynamicMapIcon({x: 1652.7761, y: -1842.0952, z: 13.5463, type: 23, color: 0}),
        new DynamicMapIcon({x: 1602.7761, y: -1847.0952, z: 13.5463, type: 6, color: 0}),
        new DynamicMapIcon({x: 1552.7761, y: -1842.0952, z: 13.5463, type: 31, color: 0}),
        new DynamicMapIcon({x: 1502.7761, y: -1847.0952, z: 13.5463, type: 10, color: 0}),
        new DynamicMapIcon({x: 1452.7761, y: -1842.0952, z: 13.5463, type: 31, color: 0})
    );
    icons.create();
    Player.addClass({skin: 100, spawn: {x: 1657.7761, y: -1842.0952, z: 13.5463}, angle: 0, weapons: [{type: Weapons.KATANA, ammo: 89}]});
});