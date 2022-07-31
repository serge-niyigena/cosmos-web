import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  createProject(project:ProjectDTO){
    return this.http.post(`${this.baseUrl}/createProject`,project);
  }

  updateProject(project:ProjectDTO,projectId:number){
    return this.http.post(`${this.baseUrl}/updateProject/${projectId}`,project);
  }

deleteProject(projectId:number){
    return this.http.post(`${this.baseUrl}/deleteProject`,projectId);
  }

  getProject(id:number): Observable<ProjectDTO>{
    return this.http.get<ProjectDTO>(`${this.baseUrl}/project/${id}`);
  }
}
