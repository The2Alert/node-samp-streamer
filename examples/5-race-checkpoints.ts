import {GameMode, Group, Player, Vehicle, Weapons} from "@sa-mp/core";
import {DynamicRaceCP} from "@sa-mp/streamer";

let leftBoost: DynamicRaceCP;
let rightBoost: DynamicRaceCP;

const boosts: Group<DynamicRaceCP> = new Group(
    new DynamicRaceCP({x: 1645.7761, y: -1840.0952, z: 13.5463, next: {x: 1640.7761, y: -1842.0952, z: 13.5463}, size: 2, type: 0}),
    new DynamicRaceCP({x: 1645.7761, y: -1838.0952, z: 13.5463, next: {x: 1640.7761, y: -1842.0952, z: 13.5463}, size: 2, type: 0}),
    new DynamicRaceCP({x: 1645.7761, y: -1836.0952, z: 13.5463, next: {x: 1640.7761, y: -1842.0952, z: 13.5463}, size: 2, type: 0}),
    new DynamicRaceCP({x: 1645.7761, y: -1834.0952, z: 13.5463, next: {x: 1640.7761, y: -1842.0952, z: 13.5463}, size: 2, type: 0})
);

GameMode.on("init", () => {
    leftBoost = DynamicRaceCP.create({x: 1645.7761, y: -1842.0952, z: 13.5463, next: {x: 1640.7761, y: -1842.0952, z: 13.5463}, size: 5, type: 0});
    rightBoost = DynamicRaceCP.create({x: 1610.7761, y: -1842.0952, z: 13.5463, next: {x: 1640.7761, y: -1842.0952, z: 13.5463}, size: 5, type: 0});
    boosts.create();
    Player.addClass({skin: 100, spawn: {x: 1657.7761, y: -1842.0952, z: 13.5463}, angle: 0, weapons: [{type: Weapons.KATANA, ammo: 580000}]});
    const vehicle: Vehicle = Vehicle.create({model: 405, x: 1657.7761, y: -1830.0952, z: 13.5463, colors: [1, 2], rotation: 0});
    vehicle.health = 1000000;
});

DynamicRaceCP.on("enter", (player, checkpoint) => {
    if(checkpoint.is(leftBoost))
        player.vehicle.velocity = {x: -1, y: 0, z: 0};
    if(checkpoint.is(rightBoost))
        player.vehicle.velocity = {x: 0.7, y: 0, z: 0};
    if(boosts.some((boost) => checkpoint.is(boost)))
        player.vehicle.velocity = {x: -0.5, y: 0, z: 0};
});