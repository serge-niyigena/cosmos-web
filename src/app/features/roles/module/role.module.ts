import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoleComponent } from '../page/role.component';
import { RoleRoutingModule } from './role-routing.module';


@NgModule({
  declarations: [RoleComponent],
  imports: [
    CommonModule,
    SharedModule,
    RoleRoutingModule
  ]
})
export class RoleModule { }
