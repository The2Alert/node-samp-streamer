import {DynamicAreaFunctions} from "./functions";

export class DynamicArea extends DynamicAreaFunctions {
    public static getById(id: number): DynamicArea {
        return new DynamicArea(id);
    }
}