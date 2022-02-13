import {StreamerItem, StreamerTypes} from "..";

export class DynamicAreaFunctions {
    protected constructor(public readonly id: number) {}

    public get item(): StreamerItem {
        return StreamerItem.get(StreamerTypes.AREA, this.id);
    }
}