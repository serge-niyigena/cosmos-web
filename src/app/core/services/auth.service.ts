import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { AuthDTO } from 'src/app/features/auth/dto/auth-dto';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/features/auth/dto/current-user';
import { NotificationService } from './notification.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    baseUrl = environment.baseApiUrl;

    loginUrl: string = `${this.baseUrl}/auth/login`;
   // logoutUrl: string = `${this.baseUrl}user/auth/sign-out`;
    private currentUserSubject: BehaviorSubject<CurrentUser>;
    public currentUser: Observable<CurrentUser>;
  
    constructor(private http: HttpClient,private notificationService: NotificationService,
      private router:Router) {
      this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser') as any));
      this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get currentUserValue(): CurrentUser {
      return this.currentUserSubject.value;
  }
  
    login(data:AuthDTO){
     
      return this.http.post<CurrentUser>(`${this.loginUrl}`,data).pipe(map(data=>{
        if(data.content){
         
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
          return data;
        }
      }));
    }

    logout(){
        localStorage.removeItem('currentUser');
               this.currentUserSubject.next(new CurrentUser());
               this.router.navigate(['/auth/login']);
               this.notificationService.openSnackBar("Logged out"); 
    }
  
    // logout(){
    //     // remove user from local storage to log user out
    
    //     return this.http.post(`${this.logoutUrl}`,new Signout(this.currentUserValue.content['token'])).subscribe(res=>{
    
    //       if(res['status']==200){
    //       localStorage.removeItem('currentUser');
    //       this.currentUserSubject.next(null);
    //       this.router.navigate(['/']);
    //       this.alertService.success(res['message']);
    //       }
         
    //     });
       
    }
  
  
    // tokenExpired(){
    //   // remove user from local storage to log user out
    //     localStorage.removeItem('currentUser');
    //     this.currentUserSubject.next(null);
    //     this.router.navigate(['/']);
    //     this.alertService.error('Token expired');
    //  }
  

    // passwordResetRequest(email: string) {
    //     return of(true).pipe(delay(1000));
    // }

    // changePassword(email: string, currentPwd: string, newPwd: string) {
    //     return of(true).pipe(delay(1000));
    // }

    // passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
    //     return of(true).pipe(delay(1000));
    // }

