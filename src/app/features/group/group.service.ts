import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GroupData } from './dto/group-data';
import { GroupDTO } from './dto/group-dto';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
 
  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getGroupsList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/group`,{params});
    
  }

  getAllGroupsList():Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/group/all`);
    
  }

  createGroup(group:GroupDTO){
    return this.http.post(`${this.baseUrl}/group/create`,group);
  }

  updateGroup(group:GroupDTO,groupId:number){
    return this.http.post(`${this.baseUrl}/group/update/${groupId}`,group);
  }

deleteGroup(group:GroupData){
    return this.http.post(`${this.baseUrl}/group/delete`,group);
  }

  getGroup(id:number): Observable<GroupDTO>{
    return this.http.get<GroupDTO>(`${this.baseUrl}/group/${id}`);
  }
}
