export class ItemCategoryDTO {
    id:number;
    name:string;
    desc:string

    constructor(data:any){
        this.name=data['name'];
        this.desc= data['desc'];
    }
}
