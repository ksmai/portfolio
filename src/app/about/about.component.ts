import { Component } from '@angular/core';

@Component({
  selector: 'port-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  title = 'K. S. Mai';
  subtitle = 'Aspiring web developer';
  content = 'Building responsive, interactive and scalable full-stack applications';
}
