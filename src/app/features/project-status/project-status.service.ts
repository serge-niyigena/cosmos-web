import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectStatusDTO } from './dto/project-status-dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectStatusService {

  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getProjectStatusesList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/projectStatus`,{params});
    
  }

  createProjectStatus(projectStatus:ProjectStatusDTO){
    return this.http.post(`${this.baseUrl}/projectStatus/create`,projectStatus);
  }

  updateProjectStatus(projectStatus:ProjectStatusDTO){
    return this.http.post(`${this.baseUrl}/projectStatus/update`,projectStatus);
  }

deleteProjectStatus(status:ProjectStatusDTO){
    return this.http.post(`${this.baseUrl}/projectStatus/delete`,status);
  }

  getProjectStatus(id:number): Observable<ProjectStatusDTO>{
    return this.http.get<ProjectStatusDTO>(`${this.baseUrl}/projectStatus/${id}`);
  }
}
