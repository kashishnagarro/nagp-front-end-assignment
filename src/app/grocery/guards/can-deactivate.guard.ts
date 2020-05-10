import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggerService } from '../../core/services/logger.service';
import { GroceryEditComponent } from '../grocery-edit/grocery-edit.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<GroceryEditComponent> {

  constructor(private logger: LoggerService) {}

  canDeactivate(
    component: GroceryEditComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    this.logger.log(`GroceryId: ${route.parent.params['id']} URL: ${state.url}`);

    // Check with component to see if we're able to deactivate
    return component.canDeactivate();
  }
}
