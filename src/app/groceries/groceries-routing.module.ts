import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroceriesComponent } from './groceries.component';
import { GroceriesGridComponent } from './groceries-grid/groceries-grid.component';

const routes: Routes = [
  { path: '', component: GroceriesComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GroceriesRoutingModule {
  static components = [ GroceriesComponent, GroceriesGridComponent ];
}
