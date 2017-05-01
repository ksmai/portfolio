import { Component } from '@angular/core';

@Component({
  selector: 'port-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  name = 'K.S. Mai';

  links = [
    'About me',
    'Projects',
    'Contact',
  ];
}
