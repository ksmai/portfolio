import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './project.component';

@NgModule({
  imports: [
    SharedModule,
  ],

  declarations: [
    ProjectComponent,
  ],

  exports: [
    ProjectComponent,
  ],
})
export class ProjectModule {
}
