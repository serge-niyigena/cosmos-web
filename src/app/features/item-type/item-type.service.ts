import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemTypeDTO } from './dto/item-type-dto';

@Injectable({
  providedIn: 'root'
})
export class ItemTypeService {
  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getItemTypesList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/itemType`,{params});
    
  }

  createItemType(itemType:ItemTypeDTO){
    return this.http.post(`${this.baseUrl}/itemType/create`,itemType);
  }

  updateItemType(itemType:ItemTypeDTO){
    return this.http.post(`${this.baseUrl}/itemType/update`,itemType);
  }

deleteItemType(itemType:ItemTypeDTO){
    return this.http.post(`${this.baseUrl}/itemType/delete`,itemType);
  }

  getItemType(id:number): Observable<ItemTypeDTO>{
    return this.http.get<ItemTypeDTO>(`${this.baseUrl}/itemType/${id}`);
  }
}
