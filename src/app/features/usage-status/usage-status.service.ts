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

    return this.http.get<any>( `${this.baseUrl}/usageStatus`,{params});
    
  }

  createUsageStatus(usageStatus:UsageStatusDTO){
    return this.http.post(`${this.baseUrl}/usageStatus/create`,usageStatus);
  }

  updateUsageStatus(usageStatus:UsageStatusDTO){
    return this.http.post(`${this.baseUrl}/usageStatus/update`,usageStatus);
  }

deleteUsageStatus(status:UsageStatusDTO){
    return this.http.post(`${this.baseUrl}/usageStatus/delete`,status);
  }

  getUsageStatus(id:number): Observable<UsageStatusDTO>{
    return this.http.get<UsageStatusDTO>(`${this.baseUrl}/usageStatus/${id}`);
  }
}
