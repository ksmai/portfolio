import { Component, HostListener, OnInit } from '@angular/core';

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

  ngOnInit() {
    setTimeout(() => this.wait = false, 15000);
  }

  scrollToAbout() {
  }

  scrollToProjects() {
  }

  scrollToContact() {
  }

  resetTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.show = false, 2000);
  }

  @HostListener('window:scroll')
  private onScroll() {
    if (this.wait) {
      return;
    }

    this.show = window.scrollY < this.lastScrollY;
    this.lastScrollY = window.scrollY;
    this.resetTimer();
  }
}
