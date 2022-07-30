import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitTypeRoutingModule } from './unit-type-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UnitTypeComponent } from '../page/unit-type.component';



@NgModule({
  declarations: [UnitTypeComponent],
  imports: [
    CommonModule,
    UnitTypeRoutingModule,
    SharedModule
  ]
})
export class UnitTypeModule { }
