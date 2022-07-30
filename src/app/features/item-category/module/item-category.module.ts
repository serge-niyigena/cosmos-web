import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemCategoryRoutingModule } from './item-category-routing.module';
import { ItemCategoryComponent } from '../page/item-category.component';



@NgModule({
  declarations: [ItemCategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    ItemCategoryRoutingModule
  ]
})
export class ItemCategoryModule { }
