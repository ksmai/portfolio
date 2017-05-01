import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
  ],

  declarations: [
    ContactComponent,
  ],

  exports: [
    ContactComponent,
  ],
})
export class ContactModule {
}
