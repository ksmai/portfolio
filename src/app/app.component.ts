import { Component, ViewChild } from '@angular/core';

import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'port-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(ContactComponent) private contactComponent: ContactComponent;

  destroy(message: string) {
    this.contactComponent.setMessage(
      `Hello!\n\nI'd like to destroy your webpage because ${message}`,
    );
  }
}
