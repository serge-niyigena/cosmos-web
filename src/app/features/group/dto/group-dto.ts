export class GroupDTO {
    id:number;
    name:string;
    desc:string;
    rolesIds:number[];
    usersIds:number[];

    constructor(data:any){
        this.name= data['name'];
        this.desc= data['desc'];
        this.rolesIds= data['rolesIds'];
        if(data['usersIds']!=null){
        this.usersIds= data['usersIds'];
        }
    }
}
