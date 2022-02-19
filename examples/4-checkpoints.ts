import {GameMode, Group, Player} from "@sa-mp/core";
import {DynamicCP} from "@sa-mp/streamer";

let moneyCheckpoint: DynamicCP;

const moneyCheckpoints: Group<DynamicCP> = new Group(
    new DynamicCP({x: 1655.7761, y: -1842.0952, z: 13.5463, size: 1}),
    new DynamicCP({x: 1653.7761, y: -1842.0952, z: 13.5463, size: 1}),
    new DynamicCP({x: 1651.7761, y: -1842.0952, z: 13.5463, size: 1}),
    new DynamicCP({x: 1649.7761, y: -1842.0952, z: 13.5463, size: 1})
);

GameMode.on("init", () => {
    moneyCheckpoint = DynamicCP.create({x: 1657.7761, y: -1842.0952, z: 13.5463, size: 2});
    moneyCheckpoints.create();
    Player.addClass({skin: 100, spawn: {x: 1657.7761, y: -1842.0952, z: 13.5463}, angle: 0, weapons: []});
});

DynamicCP.on("enter", (player, checkpoint) => {
    if(checkpoint.is(moneyCheckpoint))
        player.giveMoney(1000);
    if(moneyCheckpoints.some((money) => checkpoint.is(money)))
        player.giveMoney(200);
});

DynamicCP.on("leave", (player, checkpoint) => {
    if(checkpoint.is(moneyCheckpoint))
        player.giveMoney(-200);
});