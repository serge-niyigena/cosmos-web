import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from '../page/item.component';



@NgModule({
  declarations: [ItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    ItemRoutingModule
  ]
})
export class ItemModule { }
