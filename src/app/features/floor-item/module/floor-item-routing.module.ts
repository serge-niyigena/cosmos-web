import { NgModule } from '@angular/core';
import { FloorItemComponent } from '../page/floor-item.component';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: FloorItemComponent },
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
export class FloorItemRoutingModule { }
