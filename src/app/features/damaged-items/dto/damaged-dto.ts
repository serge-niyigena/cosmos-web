export class DamagedDTO {
	damagedDate:Date;
	damagedDesc:string;
	damagedQuantity:number;
    damagedFloorItemId:number;

    constructor(data:any){
        this.damagedDate=data['damagedDate'];
        this.damagedDesc=data['damagedDesc'];
        this.damagedQuantity=data['damagedQuantity'];
        this.damagedFloorItemId=data['damagedFloorItemId'];
    }
}
