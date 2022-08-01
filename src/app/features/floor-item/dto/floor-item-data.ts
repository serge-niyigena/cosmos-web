import { ItemData } from "../../item/dto/item-data";
import { ProjectFloorData } from "../../project-floor/dto/project-floor-data";
import { UsageStatusDTO } from "../../usage-status/dto/usage-status-dto";

export class FloorItemData {
    id:number;
    floorItemNormalQuantity:number;
    floorItemMaximumQuantity:number;
    floorItemUsedQuantity:number;
    floorItemStatusReport:string;
    floorItem:ItemData;
    floorItemProjFloor:ProjectFloorData;
    floorItemStatus:UsageStatusDTO;
}
