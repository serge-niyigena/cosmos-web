export class ItemDTO {
    id:number;
    name:string;
    desc:string;
    make:string;
    itemCategoryId:number
    itemUnitTypeId:number;
    itemTypeId:number;

    constructor(data:any){
        this.name = data['name'];
        this.desc = data['desc'];
        this.make = data['make'];
        this.itemCategoryId = data['itemCategoryId'];
        this.itemUnitTypeId = data['itemUnitTypeId'];
        this.itemTypeId = data['itemTypeId'];
    }
}
