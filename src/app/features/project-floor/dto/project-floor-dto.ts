export class ProjectFloorDTO {
      id:number;
      pFloorValue:string;
      pFloorRef:string;
      pFloorMeasurement:number;
      pFloorDescription:string;
      statusId:number;
      projectId:number;

      constructor(data:any){
            this.pFloorValue = data['pFloorValue'];
            this.pFloorRef = data['pFloorRef'];
            this.pFloorMeasurement = data['pFloorMeasurement'];
            this.pFloorDescription = data['pFloorDescription'];
            this.statusId = data['statusId'];
            this.projectId = data['projectId'];
      }
}
