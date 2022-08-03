export class ProjectFloorDTO {
      
      floorValue:string;
      floorRef:string;
      floorMeasurement:number;
      floorDescription:string;
      statusId:number;
      projectId:number;

      constructor(data:any){
            this.floorValue = data['pFloorValue'];
            this.floorRef = data['pFloorRef'];
            this.floorMeasurement = data['pFloorMeasurement'];
            this.floorDescription = data['pFloorDescription'];
            this.statusId = data['statusId'];
            this.projectId = data['projectId'];
      }
}
