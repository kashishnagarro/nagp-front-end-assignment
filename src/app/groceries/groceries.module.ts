import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroceriesRoutingModule } from './groceries-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    GroceriesRoutingModule,
    SharedModule
  ],
  declarations: [GroceriesRoutingModule.components]
})
export class GroceriesModule { }
