import { Component, HostListener, OnInit } from '@angular/core';

import { ScrollService } from '../core/scroll.service';

@Component({
  selector: 'port-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  show = false;

  private lastScrollY = 0;
  private wait = true;
  private timer: any;

  constructor(private scrollService: ScrollService) {
  }

  ngOnInit() {
    setTimeout(() => this.wait = false, 15000);
  }

  scrollToAbout() {
    this.scrollService.scrollToAbout();
  }

  scrollToProjects() {
    this.scrollService.scrollToProjects();
  }

  scrollToContact() {
    this.scrollService.scrollToContact();
  }

  resetTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.show = false, 2000);
  }

  @HostListener('window:scroll')
  private onScroll() {
    if (this.wait && window.scrollY < window.innerHeight) {
      return;
    }

    this.show = window.scrollY < this.lastScrollY;
    this.lastScrollY = window.scrollY;
    this.resetTimer();
  }
}
