import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FloorItemRoutingModule } from './floor-item-routing.module';
import { FloorItemComponent } from '../page/floor-item.component';



@NgModule({
  declarations: [FloorItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    FloorItemRoutingModule
  ]
})
export class FloorItemModule { }
