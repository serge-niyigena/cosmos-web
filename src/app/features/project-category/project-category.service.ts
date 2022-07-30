import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectCategoryDTO } from './dto/project-category-dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectCategoryService {
  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getProjectCategoriesList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/projectCategory`,{params});
    
  }

  createProjectCategory(projectCategory:ProjectCategoryDTO){
    return this.http.post(`${this.baseUrl}/projectCategory/create`,projectCategory);
  }

  updateProjectCategory(projectCategory:ProjectCategoryDTO,orgId:number){
    return this.http.post(`${this.baseUrl}/projectCategory/update/${orgId}`,projectCategory);
  }

deleteProjectCategory(orgId:number){
    return this.http.post(`${this.baseUrl}/projectCategory/delete`,orgId);
  }

  getProjectCategory(id:number): Observable<ProjectCategoryDTO>{
    return this.http.get<ProjectCategoryDTO>(`${this.baseUrl}/projectCategory/${id}`);
  }
}
