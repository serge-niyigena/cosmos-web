import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ProjectStatusComponent } from '../page/project-status.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ProjectStatusComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectStatusRoutingModule { }
