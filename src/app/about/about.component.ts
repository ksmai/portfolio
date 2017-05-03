import {
  AfterViewInit,
  Component,
  HostBinding,
  ViewChild,
} from '@angular/core';

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

  ngAfterViewInit() {
    new Promise((resolve) => setTimeout(resolve, 300))
      .then(() => this.card.startTypeIt())
      .then(() => this.typingFinished = true);
  }

  destroyPage(): void {
  }

  viewProjects(): void {
  }
}
