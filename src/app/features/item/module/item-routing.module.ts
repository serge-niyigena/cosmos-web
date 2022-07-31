import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../page/item.component';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';




const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ItemComponent },
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
export class ItemRoutingModule { }
