import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdChipsModule,
  MdDialogModule,
  MdGridListModule,
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
    MdChipsModule,
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
    MdGridListModule,
  ],

  exports: [
    MdInputModule,
    MdSnackBarModule,
    MdDialogModule,
    MdTooltipModule,
    MdChipsModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdToolbarModule,
    MdProgressBarModule,
    MdGridListModule,
  ],
})
export class MaterialModule {
}
