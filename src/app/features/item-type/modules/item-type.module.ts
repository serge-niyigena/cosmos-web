import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemTypeRoutingModule } from './item-type-routing.module';
import { ItemTypeComponent } from '../page/item-type.component';



@NgModule({
  declarations: [ItemTypeComponent],
  imports: [
    CommonModule,
    SharedModule,
    ItemTypeRoutingModule
  ]
})
export class ItemTypeModule { }
