import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroceryRoutingModule } from './grocery-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    GroceryRoutingModule,
    SharedModule
  ],
  declarations: [GroceryRoutingModule.components]
})
export class GroceryModule { }
