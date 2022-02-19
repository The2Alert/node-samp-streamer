import {GameMode, GangZone, Player, Weapons} from "@sa-mp/core";
import {Command, Context, Import, Param} from "@sa-mp/decorators";
import {DynamicArea, DynamicRectangle, GetStreamerPlayer, OnEnterDynamicArea, OnLeaveDynamicArea, StreamerGameModeExtension, StreamerPlayer, StreamerPlayerExtension} from "@sa-mp/streamer";

@Context()
export class Mode extends GameMode.Context {
    public readonly militaryArea = new DynamicRectangle({min: {x: 1655.7761, y: -1840.0952}, max: {x: 1555.7761, y: -1740.0952}});
    public readonly militaryZone = new GangZone({min: {x: 1655.7761, y: -1840.0952}, max: {x: 1555.7761, y: -1740.0952}});

    public onInit(): void {
        this.militaryArea.create();
        this.militaryZone.create();
        Player.addClass({skin: 100, spawn: {x: 1657.7761, y: -1842.0952, z: 13.5463}, angle: 0, weapons: []});
    }
}

@Context()
export class ModePlayer extends Player.Context implements OnEnterDynamicArea, OnLeaveDynamicArea {
    @GetStreamerPlayer()
    public readonly streamer: StreamerPlayer;

    @Import()
    public readonly mode: Mode;

    public onConnect(): void {
        this.mode.militaryZone.show(this, 0x36d149AA);
    }

    public onEnterDynamicArea(area: DynamicArea): void {
        if(area.is(this.mode.militaryArea)) {
            this.giveWeapon(Weapons.AK47, 110);
            this.giveWeapon(Weapons.MP5, 89);
            this.giveWeapon(Weapons.KATANA, 1);
        }
    }

    public onLeaveDynamicArea(area: DynamicArea): void {
        if(area.is(this.mode.militaryArea))
            this.resetWeapons();
    }

    @Command("toggle")
    public toggleMilitaryArea(@Param() toggle: boolean): void {
        this.streamer.toggleArea(this.mode.militaryArea, toggle);
    }
}

const gamemodeFactory = GameMode.Factory.create(Mode, [StreamerGameModeExtension]);
Player.Factory.create(ModePlayer, {
    gamemodeFactory,
    extensions: [StreamerPlayerExtension],
    commands: true
});