import { ItemCategoryDTO } from "../../item-category/dto/item-category-dto";
import { ItemTypeDTO } from "../../item-type/dto/item-type-dto";
import { UnitTypeDTO } from "../../unit-type/dto/unit-type-dto";

export class ItemData {
    id:number;
    name:string;
    desc:string;
    make:string;
    itemCategory:ItemCategoryDTO
    itemUnitType:UnitTypeDTO;
    itemType:ItemTypeDTO;
}
