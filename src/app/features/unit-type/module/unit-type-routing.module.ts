import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { UnitTypeComponent } from '../page/unit-type.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: UnitTypeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitTypeRoutingModule { }
