import { ProjectStatusDTO } from "../../project-status/dto/project-status-dto";
import { ProjectDataDTO } from "../../project/dto/project-data-dto";

export class ProjectFloorData {
    id:number;
    floorValue:string;
    floorRef:string;
    floorMeasurement:number;
    floorDescription:string;
    floorProject:ProjectDataDTO;
    floorStatus:ProjectStatusDTO;
}
