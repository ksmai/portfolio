import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';
import { TypeItDirective } from './type-it.directive';

@NgModule({
  imports: [
  ],

  declarations: [
    TypeItDirective,
  ],

  exports: [
    CommonModule,
    MaterialModule,
    TypeItDirective,
  ],
})
export class SharedModule {
}
