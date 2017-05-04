import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogComponent } from './dialog/dialog.component';
import { EnvelopeComponent } from './envelope/envelope.component';
import { GridScaleInDirective } from './grid-scale-in.directive';
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
    GridScaleInDirective,
    EnvelopeComponent,
  ],

  entryComponents: [
    DialogComponent,
  ],

  exports: [
    CommonModule,
    MaterialModule,
    TypeItDirective,
    GridScaleInDirective,
    EnvelopeComponent,
  ],
})
export class SharedModule {
}
