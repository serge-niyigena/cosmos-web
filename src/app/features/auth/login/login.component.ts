import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormControl, Validators, UntypedFormGroup, FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthDTO } from '../dto/auth-dto';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading: boolean;

    constructor(private router: Router,
        private titleService: Title,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.titleService.setTitle('COSMOS - Login');
        this.authenticationService.logout();
        this.createForm();
    }

    private createForm() {
        this.loginForm = new UntypedFormGroup({
            contact: new UntypedFormControl('', [Validators.required]),
            password: new UntypedFormControl('', Validators.required)
        });
    }

    login() {
        // const email = this.loginForm.get('email')?.value;
        // const password = this.loginForm.get('password')?.value;
        // const rememberMe = this.loginForm.get('rememberMe')?.value;

        this.loading = true;
        const auth =new AuthDTO(this.loginForm.value);
        this.authenticationService.login(auth)
            .subscribe(
                res => {
                    if(res?.content){
                        this.notificationService.openSnackBar(res?.message);
                          this.router.navigate(['/dashboard']);
                       }
                      },
                     
                error => {
                  
                   
                    this.loading = false;
                }
            );
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}
