import {GameMode, Group, Player, Weapons} from "@sa-mp/core";
import {DynamicPickup} from "@sa-mp/streamer";

let mp5Pickup: DynamicPickup;

const pickups: Group<DynamicPickup> = new Group(
    new DynamicPickup({x: 1651.7761, y: -1842.0952, z: 13.5463, model: 1212, type: 1}),
    new DynamicPickup({x: 1649.7761, y: -1842.0952, z: 13.5463, model: 1240, type: 1}),
    new DynamicPickup({x: 1647.7761, y: -1842.0952, z: 13.5463, model: 1274, type: 1})
);

GameMode.on("init", () => {
    mp5Pickup = DynamicPickup.create({x: 1653.7761, y: -1842.0952, z: 13.5463, model: 353, type: 1});
    pickups.create();
    Player.addClass({skin: 100, spawn: {x: 1657.7761, y: -1842.0952, z: 13.5463}, angle: 0, weapons: [{type: Weapons.MP5, ammo: 110}]});
});

DynamicPickup.on("pick-up", (player, pickup) => {
    if(pickup.is(mp5Pickup))
        player.giveWeapon(Weapons.MP5, 89);
});