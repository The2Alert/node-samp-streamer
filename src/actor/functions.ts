import {Player, Position} from "@sa-mp/core";
import * as amx from "@sa-mp/amx";
import {DynamicArea, Streamer, DynamicActor, StreamerItem, StreamerTypes} from "..";

export interface DynamicActorOptions extends Position {
    model: number;
    rotation: number; 
    invulnerable?: boolean;
    health?: number;
    world?: number;
    interior?: number; 
    player?: Player;
    streamDistance?: number; 
    area?: DynamicArea;
    priority?: number;
}

export interface DynamicActorAnimation {
    library: string;
    name: string;
    speed: number;
    loop: boolean;
    lockX: boolean;
    lockY: boolean;
    freeze: boolean;
    time: number;
}

export interface GetDynamicActorAnimationOptions {
    maxLibrary: number;
    maxName: number;
}

export class DynamicActorFunctions {
    public static create(options: DynamicActorOptions): DynamicActor {
        const actor = new DynamicActor(options);
        return actor.create();
    } 

    public static getById(id: number): DynamicActor {
        return new DynamicActor(id);
    }

    public static isValid(actor: DynamicActor): boolean {
        return Boolean(amx.callNative("IsValidDynamicActor", "i", actor.id).retval);
    }

    public id: number = Streamer.constants.INVALID_ID;

    constructor(public readonly idOrOptions: number | DynamicActorOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): DynamicActor {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: DynamicActorOptions = this.idOrOptions;
        const {
            model, 
            x, 
            y, 
            z, 
            rotation, 
            invulnerable = true, 
            health = 100.0, 
            world = -1, 
            interior = -1, 
            player = Player.getById(-1), 
            streamDistance = Streamer.constants.ACTOR_SD, 
            area = DynamicArea.getById(-1), 
            priority = 0
        } = options;
        this.id = amx.callNative("CreateDynamicActor", "iffffifiiifii", model, x, y, z, rotation, Number(invulnerable), health, world, interior, player.id, streamDistance, area.id, priority).retval;
        return this;
    }

    public destroy(): void {
        amx.callNative("DestroyDynamicActor", "i", this.id);
    }

    public isStreamedIn(forPlayer: Player): boolean {
        return Boolean(amx.callNative("IsDynamicActorStreamedIn", "ii", this.id, forPlayer.id).retval);
    }

    public get world(): number {
        return amx.callNative("GetDynamicActorVirtualWorld", "i", this.id).retval;
    }

    public set world(world: number) {
        amx.callNative("SetDynamicActorVirtualWorld", "ii", this.id, world);
    }

    public getAnimation({maxLibrary, maxName}: GetDynamicActorAnimationOptions): DynamicActorAnimation {
        const [library, name, speed, loop, lockX, lockY, freeze, time] = amx.callNative("GetDynamicActorAnimation", "iSSFIIIIIii", this.id, maxLibrary, maxName, maxLibrary, maxName) as unknown as [string, string, number, number, number, number, number, number];
        return {library, name, speed, loop: Boolean(loop), lockX: Boolean(lockX), lockY: Boolean(lockY), freeze: Boolean(freeze), time};
    }

    public anim({library, name, speed, loop, lockX, lockY, freeze, time}: DynamicActorAnimation): void {
        amx.callNative("ApplyDynamicActorAnimation", "issfiiiii", this.id, library, name, speed, Number(loop), Number(lockX), Number(lockY), Number(freeze), time);
    }

    public clearAnims(): void {
        amx.callNative("ClearDynamicActorAnimations", "i", this.id);
    }

    public get angle(): number {
        const [angle] = amx.callNative("GetDynamicActorFacingAngle", "iF", this.id) as number[];
        return angle;
    }

    public set angle(angle: number) {
        amx.callNative("SetDynamicActorFacingAngle", "if", this.id, angle);
    }

    public get pos(): Position {
        const [x, y, z] = amx.callNative("GetDynamicActorPos", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public set pos({x, y, z}: Position) {
        amx.callNative("SetDynamicActorPos", "ifff", this.id, x, y, z);
    }

    public get health(): number {
        const [health] = amx.callNative("GetDynamicActorHealth", "iF", this.id) as number[];
        return health;
    }

    public set health(health: number) {
        amx.callNative("SetDynamicActorHealth", "if", this.id, health);
    }

    public set invulnerable(invulnerable: boolean) {
        amx.callNative("SetDynamicActorInvulnerable", "ii", this.id, Number(invulnerable));
    }

    public get invulnerable(): boolean {
        return Boolean(amx.callNative("IsDynamicActorInvulnerable", "i", this.id).retval);
    }

    public get item(): StreamerItem {
        return StreamerItem.get(StreamerTypes.ACTOR, this.id);
    }

    public is(actor: DynamicActor): boolean {
        return this.id === actor.id;
    }
}