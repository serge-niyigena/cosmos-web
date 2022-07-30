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

    return this.http.get<any>( `${this.baseUrl}/itemType`,{params});
    
  }

  createProjectStatus(itemType:ProjectStatusDTO){
    return this.http.post(`${this.baseUrl}/itemType/create`,itemType);
  }

  updateProjectStatus(itemType:ProjectStatusDTO,orgId:number){
    return this.http.post(`${this.baseUrl}/itemType/update/${orgId}`,itemType);
  }

deleteProjectStatus(orgId:number){
    return this.http.post(`${this.baseUrl}/itemType/delete`,orgId);
  }

  getProjectStatus(id:number): Observable<ProjectStatusDTO>{
    return this.http.get<ProjectStatusDTO>(`${this.baseUrl}/itemType/${id}`);
  }
}
