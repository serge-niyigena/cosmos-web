import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectStatusRoutingModule } from './project-status-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectStatusComponent } from '../page/project-status.component';



@NgModule({
  declarations: [ProjectStatusComponent],
  imports: [
    CommonModule,
    ProjectStatusRoutingModule,
    SharedModule
  ]
})
export class ProjectStatusModule { }
