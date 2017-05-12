import {
  AfterViewInit,
  Component,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { MdDialog } from '@angular/material';

import { ContactService } from '../core/contact.service';
import { ScrollService } from '../core/scroll.service';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'port-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit {
  title = 'K. S. Mai';
  subtitle = 'Aspiring web developer';
  content = 'Building responsive, interactive and scalable full-stack applications';

  @ViewChild('card') card: any;
  @HostBinding('class.typing-finished') typingFinished = false;

  constructor(
    private scrollService: ScrollService,
    private dialog: MdDialog,
    private contactService: ContactService,
  ) {
  }

  ngAfterViewInit() {
    new Promise((resolve) => setTimeout(resolve, 300))
      .then(() => this.card.startTypeIt())
      .then(() => this.typingFinished = true);
  }

  destroyPage(): void {
    this.dialog
      .open(DialogComponent, {
        data: {
          title: 'Destroy this page?',
          requireInput: true,
          placeholder: 'Reason(s)',
          positive: 'DESTROY',
          negative: 'CANCEL',
        },
      })
      .afterClosed()
      .subscribe((message: boolean|string) => {
        if (typeof message === 'string') {
          this.contactService.setMessage(
            `Hello!\n\nI'd like to destroy your portfolio because\n${message}`,
          );
          this.scrollService.scrollToContact();
        }
      });
  }

  viewProjects(): void {
    this.scrollService.scrollToProjects();
  }

  skip(): void {
    this.card.skip();
  }
}
