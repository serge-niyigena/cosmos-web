import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserTypeRoutingModule } from './user-type-routing.module';
import { UserTypeComponent } from '../page/user-type/user-type.component';



@NgModule({
  declarations: [UserTypeComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserTypeRoutingModule
  ]
})
export class UserTypeModule { }
