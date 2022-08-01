import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from './dto/user-dto';
import { UserSendDTO } from './dto/user-send-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getUsersList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/user`,{params});
    
  }

  getAllUsersList():Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/user/all`);
    
  }

  createUser(user:UserSendDTO){
    return this.http.post(`${this.baseUrl}/user/create`,user);
  }

  updateUser(user:UserSendDTO,userId:number){
    return this.http.post(`${this.baseUrl}/user/update/${userId}`,user);
  }

deleteUser(user:UserDTO){
    return this.http.post(`${this.baseUrl}/user/delete`,user);
  }

  getUser(id:number): Observable<UserDTO>{
    return this.http.get<UserDTO>(`${this.baseUrl}/user/${id}`);
  }
}
