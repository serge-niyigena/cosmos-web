import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { FloorItemComponent } from '../../floor-item/page/floor-item.component';
import { ProjectFloorFloorComponent } from '../page/project-floor.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ProjectFloorFloorComponent },
      {path:'floor-item', component: FloorItemComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectFloorRoutingModule { }
