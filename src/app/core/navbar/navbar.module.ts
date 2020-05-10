import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnsureModuleLoadedOnceGuard } from '../ensure-module-loaded-once.guard';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [CommonModule],
  exports: [NavbarComponent],
  declarations: [NavbarComponent]
})
export class NavbarModule extends EnsureModuleLoadedOnceGuard {

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: NavbarModule) {
    super(parentModule);
  }

}
