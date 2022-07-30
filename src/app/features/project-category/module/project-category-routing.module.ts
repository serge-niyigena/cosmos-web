import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCategoryComponent } from '../page/project-category.component';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ProjectCategoryComponent },
    ]
  }
];

@NgModule({
  exports:[RouterModule],
  imports: [
    RouterModule.forChild(routes),
    RouterModule
  ]
})
export class ProjectCategoryRoutingModule { }
