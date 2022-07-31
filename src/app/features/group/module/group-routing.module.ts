import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from '../page/group.component';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';




const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: GroupComponent },
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
export class GroupRoutingModule { }
