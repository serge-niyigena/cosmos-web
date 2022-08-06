import { FloorItemData } from "../../floor-item/dto/floor-item-data";

export class DamagedData {
    damagedId:number;
    damagedDate:Date;
	damagedDesc:string;
	damagedQuantity:number;
    floorItem:FloorItemData;
}

