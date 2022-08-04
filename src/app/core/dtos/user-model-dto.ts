import { GroupData } from "src/app/features/group/dto/group-data";
import { OrgDTO } from "src/app/features/organization/dto/org-dto";
import { RoleDTO } from "src/app/features/roles/dto/role-dto";
import { UserTypeDTO } from "src/app/features/user-type/dto/user-type-dto";

export class UserModelDTO {

    userGroups:GroupData[];
    userRoles: RoleDTO[];
    sub: string;
    userOrg:OrgDTO;
    userType:UserTypeDTO;
    userName: string;
    exp: number;
    userId: number;
    iat: number;
    
    constructor(data:any){
        this.userGroups= data['userGroups'];
        this.userRoles= data['userRoles'];
        this.sub= data['sub'];
        this.userOrg= data['userOrg'];
        this.userType=data['userType'];
        this.userName= data['userName'];
        this.exp = data['exp'];
        this.userId = data['userId'];
        this.iat = data['iat'];
    }

}