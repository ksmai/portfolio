import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TeamComponent } from './team.component';

@NgModule({
  imports: [
    SharedModule,
  ],

  declarations: [
    TeamComponent,
  ],

  exports: [
    TeamComponent,
  ],
})
export class TeamModule {
}
