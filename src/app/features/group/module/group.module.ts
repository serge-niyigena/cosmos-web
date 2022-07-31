import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from '../page/group.component';



@NgModule({
  declarations: [GroupComponent],
  imports: [
    CommonModule,
    SharedModule,
    GroupRoutingModule
  ]
})
export class GroupModule { }
