import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemDTO } from './dto/item-dto';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

 
  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getItemsList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/item`,{params});
    
  }

  getAllItemsList():Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/item/all`);
    
  }

  createItem(item:ItemDTO){
    return this.http.post(`${this.baseUrl}/createItem`,item);
  }

  updateItem(item:ItemDTO,itemId:number){
    return this.http.post(`${this.baseUrl}/updateItem/${itemId}`,item);
  }

deleteItem(itemId:number){
    return this.http.post(`${this.baseUrl}/deleteItem`,itemId);
  }

  getItem(id:number): Observable<ItemDTO>{
    return this.http.get<ItemDTO>(`${this.baseUrl}/item/${id}`);
  }
}
