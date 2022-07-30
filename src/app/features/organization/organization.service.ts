import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrgDTO } from './dto/org-dto';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getOrganizationsList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/organization`,{params});
    
  }

  createOrganization(organization:OrgDTO){
    return this.http.post(`${this.baseUrl}/organization/create`,organization);
  }

  updateOrganization(organization:OrgDTO,orgId:number){
    return this.http.post(`${this.baseUrl}/organization/update/${orgId}`,organization);
  }

deleteOrganization(orgId:number){
    return this.http.post(`${this.baseUrl}/organization/delete`,orgId);
  }

  getOrganization(id:number): Observable<OrgDTO>{
    return this.http.get<OrgDTO>(`${this.baseUrl}/organization/${id}`);
  }

}
