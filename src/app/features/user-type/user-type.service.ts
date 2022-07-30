import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserTypeDTO } from './dto/user-type-dto';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getUserTypesList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/userType`,{params});
    
  }

  createUserType(userType:UserTypeDTO){
    return this.http.post(`${this.baseUrl}/userType/create`,userType);
  }

  updateUserType(userType:UserTypeDTO,orgId:number){
    return this.http.post(`${this.baseUrl}/userType/update/${orgId}`,userType);
  }

deleteUserType(orgId:number){
    return this.http.post(`${this.baseUrl}/userType/delete`,orgId);
  }

  getUserType(id:number): Observable<UserTypeDTO>{
    return this.http.get<UserTypeDTO>(`${this.baseUrl}/userType/${id}`);
  }
}
