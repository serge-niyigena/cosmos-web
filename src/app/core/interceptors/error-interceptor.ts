import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthenticationService } from "../services/auth.service";
import { NotificationService } from "../services/notification.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
       
    constructor(private authService: AuthenticationService,
        private notificationService:NotificationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                //auto logout if 401 response returned from api
               this.authService.logout();
              // location.reload();
            }
            if(err.status===500){
                this.notificationService.openSnackBar(err.error.message);
            }
            const error = err.error || err.statusText;
            let errorMsg = '';
        Object.entries(err?.error?.errors).forEach(entry => {
          const [k, v] = entry;
          errorMsg += `${k}-${v}; `;
        this.notificationService.openSnackBar(errorMsg);
        });
            return throwError(error);
        }))
    }
}
