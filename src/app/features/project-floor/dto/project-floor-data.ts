import { ProjectStatusDTO } from "../../project-status/dto/project-status-dto";
import { ProjectDataDTO } from "../../project/dto/project-data-dto";

export class ProjectFloorData {
    id:number;
    pFloorValue:string;
    pFloorRef:string;
    pFloorMeasurement:number;
    pFloorDescription:string;
    pFloorProject:ProjectDataDTO;
    pFloorStatus:ProjectStatusDTO;
}
