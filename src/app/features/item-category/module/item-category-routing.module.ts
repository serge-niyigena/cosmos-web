import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ItemCategoryComponent } from '../page/item-category.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ItemCategoryComponent },
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
export class ItemCategoryRoutingModule { }
