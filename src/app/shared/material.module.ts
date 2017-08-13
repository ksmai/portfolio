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
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdToolbarModule,
    MdProgressBarModule,
    MdGridListModule,
    MdTooltipModule,
  ],

  exports: [
    MdInputModule,
    MdSnackBarModule,
    MdDialogModule,
    MdChipsModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdToolbarModule,
    MdProgressBarModule,
    MdGridListModule,
    MdTooltipModule,
  ],
})
export class MaterialModule {
}
