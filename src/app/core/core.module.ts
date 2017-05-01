import { NgModule } from '@angular/core';

import { ProjectService } from './project.service';

@NgModule({
  providers: [
    ProjectService,
  ],
})
export class CoreModule {
}
