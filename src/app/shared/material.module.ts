import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdChipsModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdProgressBarModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdTooltipModule,
  MdGridListModule,
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
