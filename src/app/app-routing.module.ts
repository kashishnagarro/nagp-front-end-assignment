import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';

import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';
import { CanActivateGuard } from './core/guards/can-activate.guard';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'groceries/:id', data: { preload: true }, loadChildren: () => import('./grocery/grocery.module')
    .then(m => m.GroceryModule), canActivate: [CanActivateGuard]
  },
  {
    path: 'groceries', loadChildren: () => import('./groceries/groceries.module').then(m => m.GroceriesModule),
    canActivate: [CanActivateGuard]
  },
  { path: '**', pathMatch: 'full', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadModulesStrategy })],
  exports: [RouterModule],
  providers: [PreloadModulesStrategy]
})
export class AppRoutingModule { }
