import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from './material.module';
import { TypeItDirective } from './type-it.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],

  declarations: [
    TypeItDirective,
    DialogComponent,
  ],

  entryComponents: [
    DialogComponent,
  ],

  exports: [
    CommonModule,
    MaterialModule,
    TypeItDirective,
  ],
})
export class SharedModule {
}
