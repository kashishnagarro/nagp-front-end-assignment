import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroceryComponent } from './grocery.component';
import { GroceryDetailsComponent } from './grocery-details/grocery-details.component';
import { GroceryEditComponent } from './grocery-edit/grocery-edit.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

const routes: Routes = [
    {
      path: '',
      component: GroceryComponent,
      children: [
        { path: 'details', component: GroceryDetailsComponent },
        {
          path: 'edit',
          component: GroceryEditComponent,
          canDeactivate: [CanDeactivateGuard]
        }
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [CanDeactivateGuard]
})
export class GroceryRoutingModule {
    static components = [GroceryComponent, GroceryDetailsComponent, GroceryEditComponent];
}
