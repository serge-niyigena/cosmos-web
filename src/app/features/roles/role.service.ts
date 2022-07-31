import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoleDTO } from './dto/role-dto';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getRolesList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/role`,{params});
    
  }

  getAllRolesList():Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/role/all`);
    
  }

  createRole(role:RoleDTO){
    return this.http.post(`${this.baseUrl}/createRole`,role);
  }

  updateRole(role:RoleDTO,roleId:number){
    return this.http.post(`${this.baseUrl}/updateRole/${roleId}`,role);
  }

deleteRole(roleId:number){
    return this.http.post(`${this.baseUrl}/deleteRole`,roleId);
  }

  getRole(id:number): Observable<RoleDTO>{
    return this.http.get<RoleDTO>(`${this.baseUrl}/role/${id}`);
  }
}
