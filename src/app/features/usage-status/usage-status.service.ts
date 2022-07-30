import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsageStatusDTO } from './dto/usage-status-dto';

@Injectable({
  providedIn: 'root'
})
export class UsageStatusService {
  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getUsageStatusesList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/itemType`,{params});
    
  }

  createUsageStatus(itemType:UsageStatusDTO){
    return this.http.post(`${this.baseUrl}/itemType/create`,itemType);
  }

  updateUsageStatus(itemType:UsageStatusDTO,orgId:number){
    return this.http.post(`${this.baseUrl}/itemType/update/${orgId}`,itemType);
  }

deleteUsageStatus(orgId:number){
    return this.http.post(`${this.baseUrl}/itemType/delete`,orgId);
  }

  getUsageStatus(id:number): Observable<UsageStatusDTO>{
    return this.http.get<UsageStatusDTO>(`${this.baseUrl}/itemType/${id}`);
  }
}
