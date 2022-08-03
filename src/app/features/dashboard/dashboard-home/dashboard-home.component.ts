import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CurrentUser } from '../../auth/dto/current-user';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  currentUser: CurrentUser;
  userModel:any;

  constructor(private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger) {
      this.authService.currentUser.subscribe(x=>{
        if(x!=null){
          console.log(x)
        const jwtDecoded: {}  = JSON.parse(atob(x.content["token"].split(".")[1]));
        this.userModel=jwtDecoded['userName'];
        }
      }); 
      //this.uRoles= this.uRoleService.setRoles(this.userModel.userRoles);
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.titleService.setTitle('COSMOS - Dashboard');
    this.logger.log('Dashboard loaded');

    setTimeout(() => {
      this.notificationService.openSnackBar('Welcome!');
    });
  }
}
