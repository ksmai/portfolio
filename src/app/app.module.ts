import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import 'hammerjs';

import '../styles/styles.scss';
import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { ContactModule } from './contact/contact.module';
import { CoreModule } from './core/core.module';
import { ProjectModule } from './project/project.module';
import { TeamModule } from './team/team.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AboutModule,
    ProjectModule,
    ContactModule,
    TeamModule,
    CoreModule,
  ],

  declarations: [
    AppComponent,
  ],

  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
