import {
  AfterViewInit,
  Component,
  HostBinding,
  ViewChild,
} from '@angular/core';

import { ScrollService } from '../core/scroll.service';

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

  constructor(private scrollService: ScrollService) {
  }

  ngAfterViewInit() {
    new Promise((resolve) => setTimeout(resolve, 300))
      .then(() => this.card.startTypeIt())
      .then(() => this.typingFinished = true);
  }

  destroyPage(): void {
    this.scrollService.scrollToContact();
  }

  viewProjects(): void {
    this.scrollService.scrollToProjects();
  }
}
