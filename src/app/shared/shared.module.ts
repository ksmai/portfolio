import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DialogComponent } from './dialog/dialog.component';
import { GridScaleInDirective } from './grid-scale-in.directive';
import { MaterialModule } from './material.module';
import { TypeItDirective } from './type-it.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],

  declarations: [
    TypeItDirective,
    DialogComponent,
    GridScaleInDirective,
  ],

  entryComponents: [
    DialogComponent,
  ],

  exports: [
    CommonModule,
    MaterialModule,
    TypeItDirective,
    GridScaleInDirective,
  ],
})
export class SharedModule {
}
