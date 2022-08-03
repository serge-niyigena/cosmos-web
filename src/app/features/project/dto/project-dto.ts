export class ProjectDTO {
    id:number;
    name:string;
    desc:string;
    projWef:Date;
    projWet:Date;
    selectionType:string;
    statusId:number;
    organizationId:number;
    usersIds:number[];
    categoryId:number;

    constructor(data:any){
        this.name = data['name'];
        this.desc = data['desc'];
        this.projWef = data['projWef'];
        this.projWet = data['projWet'];
        this.selectionType = data['selectionType'];
        this.statusId = data['statusId'];
        this.organizationId = data['organizationId'];
        if(data['usersIds']!=null){
            this.usersIds=data['usersIds']
        }
        
        this.categoryId = data['categoryId'];
    }
}
