import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectFloorDTO } from './dto/project-floor-dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectFloorService {

  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getProjectFloorsList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/projectFloor`,{params});
    
  }

  createProjectFloor(projectFloor:ProjectFloorDTO){
    return this.http.post(`${this.baseUrl}/createProjectFloor`,projectFloor);
  }

  updateProjectFloor(projectFloor:ProjectFloorDTO,projectFloorId:number){
    return this.http.post(`${this.baseUrl}/updateProjectFloor/${projectFloorId}`,projectFloor);
  }

deleteProjectFloor(projectFloorId:number){
    return this.http.post(`${this.baseUrl}/deleteProjectFloor`,projectFloorId);
  }

  getProjectFloor(id:number): Observable<ProjectFloorDTO>{
    return this.http.get<ProjectFloorDTO>(`${this.baseUrl}/projectFloor/${id}`);
  }
}
