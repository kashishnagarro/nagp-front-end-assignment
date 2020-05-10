import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrComponent } from './toastr.component';
import { ToastrService } from './toastr.service';
import { EnsureModuleLoadedOnceGuard } from '../ensure-module-loaded-once.guard';

@NgModule({
  imports: [CommonModule],
  exports: [ToastrComponent],
  providers: [ToastrService],
  declarations: [ToastrComponent]
})
export class ToastrModule extends EnsureModuleLoadedOnceGuard {

  constructor(@Optional() @SkipSelf() parentModule: ToastrModule) {
    super(parentModule);
  }
}
