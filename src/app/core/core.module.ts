import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ContactService } from './contact.service';
import { ProjectService } from './project.service';
import { ScrollService } from './scroll.service';

@NgModule({
  imports: [
    HttpModule,
  ],

  providers: [
    ContactService,
    ProjectService,
    ScrollService,
  ],
})
export class CoreModule {
}
