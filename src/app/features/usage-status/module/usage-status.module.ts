import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsageStatusRoutingModule } from './usage-status-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsageStatusComponent } from '../page/usage-status.component';



@NgModule({
  declarations: [UsageStatusComponent],
  imports: [
    CommonModule,
    UsageStatusRoutingModule,
    SharedModule
  ]
})
export class UsageStatusModule { }
