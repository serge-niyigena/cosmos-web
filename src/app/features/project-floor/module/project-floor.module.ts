import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectFloorRoutingModule } from './project-floor-routing.module';
import { ProjectFloorFloorComponent } from '../page/project-floor.component';

@NgModule({
    imports: [
        CommonModule,
        ProjectFloorRoutingModule,
        SharedModule
    ],
    declarations: [
        ProjectFloorFloorComponent
    ]
})
export class ProjectFloorModule { }
