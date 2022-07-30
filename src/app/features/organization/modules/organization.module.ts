import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from '../org-page/organization.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [OrganizationComponent],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    SharedModule
  ]
})
export class OrganizationModule { }
