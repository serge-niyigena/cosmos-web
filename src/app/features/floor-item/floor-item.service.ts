import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FloorItemData } from './dto/floor-item-data';
import { FloorItemDTO } from './dto/floor-item-dto';

@Injectable({
  providedIn: 'root'
})
export class FloorItemService {

  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getFloorItemsList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/floorItem`,{params});
    
  }

  createFloorItem(floorItem:FloorItemDTO){
    return this.http.post(`${this.baseUrl}/floorItem/create`,floorItem);
  }

  updateFloorItem(floorItem:FloorItemDTO,floorItemId:number){
    return this.http.post(`${this.baseUrl}/floorItem/update/${floorItemId}`,floorItem);
  }

  updateFloorItemUsage(floorItemId:number,usage:FloorItemDTO){
    return this.http.post(`${this.baseUrl}/floorItem/used/update/${floorItemId}`,usage);
  }

  

deleteFloorItem(floorItem:FloorItemData){
    return this.http.post(`${this.baseUrl}/floorItem/delete`,floorItem);
  }

  getFloorItem(id:number): Observable<FloorItemDTO>{
    return this.http.get<FloorItemDTO>(`${this.baseUrl}/floorItem/${id}`);
  }
}
