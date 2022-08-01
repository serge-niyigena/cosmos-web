import { OrgDTO } from "../../organization/dto/org-dto";
import { ProjectDataDTO } from "../../project/dto/project-data-dto";
import { RoleDTO } from "../../roles/dto/role-dto";
import { UserTypeDTO } from "../../user-type/dto/user-type-dto";
import { UserGroupDTO } from "./user-groupDTO";

export class UserDTO {

    id: number;
    userFullName: string;
    userMobile: string;
    userEmail: string;
    userType: UserTypeDTO;
    groups: UserGroupDTO[];
    roles: RoleDTO[];
    projects: ProjectDataDTO[];
    userStatus: string;
    userReset: string;
    userOrg:OrgDTO;
    

}
