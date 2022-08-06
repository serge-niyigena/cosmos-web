import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DamagedRoutingModule } from './damaged-routing.module';
import { DamagedItemComponent } from '../page/damaged-item.component';



@NgModule({
  declarations: [DamagedItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    DamagedRoutingModule
  ]
})
export class DamagedModule { }
