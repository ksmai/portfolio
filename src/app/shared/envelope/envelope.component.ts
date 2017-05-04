import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'port-envelope',
  templateUrl: './envelope.component.html',
  styleUrls: ['./envelope.component.scss'],
})
export class EnvelopeComponent {
  @HostBinding('class.closing') closing = false;

  close(): Promise<any> {
    this.closing = true;

    return new Promise((resolve) => setTimeout(resolve, 5000));
  }

  reopen(): void {
    this.closing = false;
  }
}
