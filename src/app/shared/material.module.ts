import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdProgressBarModule,
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
    MdProgressBarModule,
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
    MdProgressBarModule,
  ],
})
export class MaterialModule {
}
