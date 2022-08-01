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

    return this.http.get<any>( `${this.baseUrl}/unitType`,{params});
    
  }

  createUnitType(unitType:UnitTypeDTO){
    return this.http.post(`${this.baseUrl}/unitType/create`,unitType);
  }

  updateUnitType(unitType:UnitTypeDTO){
    return this.http.post(`${this.baseUrl}/unitType/update/`,unitType);
  }

deleteUnitType(type:UnitTypeDTO){
    return this.http.post(`${this.baseUrl}/unitType/delete`,type);
  }

  getUnitType(id:number): Observable<UnitTypeDTO>{
    return this.http.get<UnitTypeDTO>(`${this.baseUrl}/unitType/${id}`);
  }
}
