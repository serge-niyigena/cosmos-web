import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    return this.http.post(`${this.baseUrl}/createFloorItem`,floorItem);
  }

  updateFloorItem(floorItem:FloorItemDTO,floorItemId:number){
    return this.http.post(`${this.baseUrl}/updateFloorItem/${floorItemId}`,floorItem);
  }

deleteFloorItem(floorItemId:number){
    return this.http.post(`${this.baseUrl}/deleteFloorItem`,floorItemId);
  }

  getFloorItem(id:number): Observable<FloorItemDTO>{
    return this.http.get<FloorItemDTO>(`${this.baseUrl}/floorItem/${id}`);
  }
}
