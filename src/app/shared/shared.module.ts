import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { PaginationModule } from './pagination/pagination.module';
import { FilterTextboxModule } from './filter-textbox/filter-textbox.module';
import { SortByDirective } from './directives/sortby.directive';

@NgModule({
  declarations: [CapitalizePipe, TrimPipe, SortByDirective],
  imports: [
    CommonModule,
    PaginationModule,
    FilterTextboxModule
  ],
  exports: [FormsModule,
    CapitalizePipe,
    TrimPipe,
    PaginationModule,
    FilterTextboxModule,
    SortByDirective]
})
export class SharedModule { }
