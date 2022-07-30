import { NgModule } from '@angular/core';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemTypeComponent } from '../page/item-type.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ItemTypeComponent },
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
export class ItemTypeRoutingModule { }
