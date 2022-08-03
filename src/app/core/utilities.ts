import { Inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Utilities {

  static  getRequestParams(searchValue: string,pgNum: number,pgSize: number,sortDrct: string): any {
        // tslint:disable-next-line:prefer-const
        let params: any = {};
    
        if (searchValue) {
          params[`q`] = searchValue;
        }
    
        if (pgNum) {
          params[`pgNum`] = pgNum;
        }
    
        if (pgSize) {
          params[`pgSize`] = pgSize;
        }
    
        if (sortDrct) {
          params[`sortDirection`] = sortDrct;
        }
    
        return params;
      }
}
