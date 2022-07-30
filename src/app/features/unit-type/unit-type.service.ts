import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnitTypeDTO } from './dto/unit-type-dto';

@Injectable({
  providedIn: 'root'
})
export class UnitTypeService {

  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getUnitTypesList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/itemType`,{params});
    
  }

  createUnitType(itemType:UnitTypeDTO){
    return this.http.post(`${this.baseUrl}/itemType/create`,itemType);
  }

  updateUnitType(itemType:UnitTypeDTO,orgId:number){
    return this.http.post(`${this.baseUrl}/itemType/update/${orgId}`,itemType);
  }

deleteUnitType(orgId:number){
    return this.http.post(`${this.baseUrl}/itemType/delete`,orgId);
  }

  getUnitType(id:number): Observable<UnitTypeDTO>{
    return this.http.get<UnitTypeDTO>(`${this.baseUrl}/itemType/${id}`);
  }
}
