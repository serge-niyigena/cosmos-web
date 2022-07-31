import { RoleDTO } from "../../roles/dto/role-dto";
import { UserDTO } from "../../users/dto/user-dto";

export class GroupData {
    id:number;
    name:string;
    desc:string;
    roles:RoleDTO[];
    users:UserDTO[];
}
