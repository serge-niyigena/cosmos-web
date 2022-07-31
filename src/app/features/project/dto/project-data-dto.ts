import { OrgDTO } from "../../organization/dto/org-dto";
import { ProjectCategoryDTO } from "../../project-category/dto/project-category-dto";
import { ProjectStatusDTO } from "../../project-status/dto/project-status-dto";
import { UserDTO } from "../../users/dto/user-dto";

export class ProjectDataDTO {
    id:number;
    name:string;
    desc:string;
    reference:string;
    creationDate:Date;
    projWef:Date;
    projWet:Date;
    selectionType:string;
    projStatus:ProjectStatusDTO;
    projectCategory:ProjectCategoryDTO;
    projOrganization:OrgDTO;
    users:UserDTO[];
}
