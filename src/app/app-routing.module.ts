import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';

import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';
import { CanActivateGuard } from './core/guards/can-activate.guard';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'groceries/:id', data: { preload: true }, loadChildren: () => import('./grocery/grocery.module')
    .then(m => m.GroceryModule)// ,canActivate: [CanActivateGuard]
  },
  {
    path: 'groceries', loadChildren: () => import('./groceries/groceries.module').then(m => m.GroceriesModule)
    // ,canActivate: [CanActivateGuard]
  },
  // { path: 'orders', data: { preload: true }, loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  // { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: '**', pathMatch: 'full', redirectTo: '/login' } // catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadModulesStrategy })],
  exports: [RouterModule],
  providers: [PreloadModulesStrategy]
})
export class AppRoutingModule { }
