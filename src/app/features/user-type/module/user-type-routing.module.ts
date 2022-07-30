import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTypeComponent } from '../page/user-type/user-type.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: UserTypeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTypeRoutingModule { }
