import { ProjectDTO } from "../../project/dto/project-dto";
import { UserTypeDTO } from "../../user-type/dto/user-type-dto";
import { UserGroupDTO } from "./user-groupDTO";
import { UserRoleDTO } from "./user-role-dto";

export class UserDTO {

    id: number;
    userFullName: string;
    userMobile: string;
    userEmail: string;
    userType: UserTypeDTO;
    groups: UserGroupDTO[];
    roles: UserRoleDTO[];
    projects: ProjectDTO[];
    userStatus: string;
    userReset: string;
    

}
