import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdTooltipModule,
} from '@angular/material';

@NgModule({
  imports: [
    MdInputModule,
    MdSnackBarModule,
    MdDialogModule,
    MdTooltipModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdToolbarModule,
  ],

  exports: [
    MdInputModule,
    MdSnackBarModule,
    MdDialogModule,
    MdTooltipModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdToolbarModule,
  ],
})
export class MaterialModule {
}
