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

  updateProjectCategory(id:number,projectCategory:ProjectCategoryDTO){
    return this.http.post(`${this.baseUrl}/projectCategory/update/${id}`,projectCategory);
  }

deleteProjectCategory(cat:ProjectCategoryDTO){
    return this.http.post(`${this.baseUrl}/projectCategory/delete`,cat);
  }

  getProjectCategory(id:number): Observable<ProjectCategoryDTO>{
    return this.http.get<ProjectCategoryDTO>(`${this.baseUrl}/projectCategory/${id}`);
  }
}
