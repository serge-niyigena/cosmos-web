import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemCategoryDTO } from './dto/item-category-dto';

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService {
  baseUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }


  getItemCategorysList(params:any):Observable<any[]>  {

    return this.http.get<any>( `${this.baseUrl}/itemCategory`,{params});
    
  }

  createItemCategory(itemCategory:ItemCategoryDTO){
    return this.http.post(`${this.baseUrl}/itemCategory/create`,itemCategory);
  }

  updateItemCategory(itemCategory:ItemCategoryDTO,orgId:number){
    return this.http.post(`${this.baseUrl}/itemCategory/update/${orgId}`,itemCategory);
  }

deleteItemCategory(cat:ItemCategoryDTO){
    return this.http.post(`${this.baseUrl}/itemCategory/delete`,cat);
  }

  getItemCategory(id:number): Observable<ItemCategoryDTO>{
    return this.http.get<ItemCategoryDTO>(`${this.baseUrl}/itemCategory/${id}`);
  }
}
