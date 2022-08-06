import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DamagedData } from './dto/damaged-data';
import { DamagedDTO } from './dto/damaged-dto';

@Injectable({
  providedIn: 'root'
})
export class DamagedService {
  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getDamagedItemsList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/damagedItem`,{params});
    
  }

  createDamagedItem(damagedItem:DamagedDTO){
    return this.http.post(`${this.baseUrl}/damagedItem/create`,damagedItem);
  }

  updateDamagedItem(damagedItem:DamagedDTO,damagedItemId:number){
    return this.http.post(`${this.baseUrl}/damagedItem/update/${damagedItemId}`,damagedItem);
  }
  

deleteDamagedItem(damagedItem:DamagedData){
    return this.http.post(`${this.baseUrl}/damagedItem/delete`,damagedItem);
  }

  getDamagedItem(id:number): Observable<DamagedDTO>{
    return this.http.get<DamagedDTO>(`${this.baseUrl}/damagedItem/${id}`);
  }
}
