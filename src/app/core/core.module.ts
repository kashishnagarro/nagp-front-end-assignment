import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { CanActivateGuard } from './guards/can-activate.guard';
import { Service } from './services';
import { ToastrModule } from './toastr/toastr.module';
import { ModalModule } from './modal/modal.module';
import { NavbarModule } from './navbar/navbar.module';
import { OverlayModule } from './overlay/overlay.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule,
    ModalModule,
    OverlayModule
  ],
  exports: [ToastrModule, ModalModule, NavbarModule, OverlayModule],
  providers: [...Service,
  { provide: 'Window', useFactory: () => window },
    CanActivateGuard]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {    // Ensure that CoreModule is only loaded into AppModule {
  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
