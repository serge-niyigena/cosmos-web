import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectDataDTO } from './dto/project-data-dto';
import { ProjectDTO } from './dto/project-dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getProjectsList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/project`,{params});
    
  }

  getAllProjects():Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/project/all`);
    
  }

  createProject(project:ProjectDTO){
    return this.http.post(`${this.baseUrl}/project/create`,project);
  }

  updateProject(project:ProjectDTO,projectId:number){
    return this.http.post(`${this.baseUrl}/project/update/${projectId}`,project);
  }

deleteProject(project:ProjectDataDTO){
    return this.http.post(`${this.baseUrl}/project/delete`,project);
  }

  getProject(id:number): Observable<ProjectDTO>{
    return this.http.get<ProjectDTO>(`${this.baseUrl}/project/${id}`);
  }
}
