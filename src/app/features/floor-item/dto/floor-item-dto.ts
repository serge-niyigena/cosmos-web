export class FloorItemDTO {
    floorItemNormalQuantity:number;
    floorItemMaximumQuantity:number;
    floorItemUsedQuantity:number;
    floorItemStatusReport:string;
    floorItemItemId:number;
    floorItemProjectFloorId:number;
    floorItemStatusId:number;

    constructor(data:any){
        this.floorItemNormalQuantity = data['floorItemNormalQuantity'];
        this.floorItemMaximumQuantity = data['floorItemMaximumQuantity'];
        this.floorItemUsedQuantity = data['floorItemUsedQuantity'];
        this.floorItemStatusReport = data['floorItemStatusReport'];
        this.floorItemProjectFloorId = data['floorItemProjectFloorId'];
        this.floorItemItemId = data['floorItemItemId'];
    }
}

