import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { MdDialog } from '@angular/material';

import { ContactService } from '../core/contact.service';
import { DestroyerService } from '../core/destroyer.service';
import { ScrollService } from '../core/scroll.service';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'port-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit {
  title = 'K. S. Mai';
  subtitle = 'Full stack web developer';
  content = 'Building responsive, robust and reliable web applications';

  @ViewChild('card') card: any;
  @HostBinding('class.typing-finished') typingFinished = false;

  constructor(
    private scrollService: ScrollService,
    private dialog: MdDialog,
    private contactService: ContactService,
    private destroyer: DestroyerService,
    private el: ElementRef,
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
            `Hello!\n\nI have destroyed your portfolio because\n${message}`,
          );
          this.destroyer.destroy(this.el, {
            complete: () => this.scrollService.scrollToContact(),
          });
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
