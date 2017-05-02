import { AfterViewInit, Component, ViewChild } from '@angular/core';

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

  ngAfterViewInit() {
    this.card.startTypeIt();
  }
}
