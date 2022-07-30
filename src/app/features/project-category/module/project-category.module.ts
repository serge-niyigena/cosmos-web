import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectCategoryRoutingModule } from './project-category-routing.module';
import { ProjectCategoryComponent } from '../page/project-category.component';



@NgModule({
  declarations: [ProjectCategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProjectCategoryRoutingModule
  ]
})
export class ProjectCategoryModule { }
