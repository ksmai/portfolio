import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  Output,
  ViewChild,
} from '@angular/core';
import { MdDialog } from '@angular/material';

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

  @Output() destroy = new EventEmitter<string>();
  @ViewChild('card') card: any;
  @HostBinding('class.typing-finished') typingFinished = false;

  constructor(
    private scrollService: ScrollService,
    private dialog: MdDialog,
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
          this.destroy.emit(message);
          this.scrollService.scrollToContact();
        }
      });
  }

  viewProjects(): void {
    this.scrollService.scrollToProjects();
  }
}
