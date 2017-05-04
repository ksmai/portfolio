import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[portGridScaleIn]',
})
export class GridScaleInDirective implements AfterViewInit {
  @Input() cols: number;
  @Input('portGridScaleIn') className: string;
  @Input() fps = 6;

  private tiles: HTMLCollection;
  private started = false;
  private lastTimestamp = Date.now();

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.tiles = this.el.nativeElement.querySelectorAll('md-grid-tile');
  }

  @HostListener('window:scroll')
  private onScroll() {
    if (this.started) {
      return;
    }

    let el = this.el.nativeElement;
    const els: HTMLElement[] = [];
    while (el !== document.body) {
      els.push(el);
      el = el.offsetParent;
    }

    const offsetTop = els
      .reduce((offset: number, elm) => offset + elm.offsetTop, 0);

    const visible = window.scrollY + window.innerHeight / 2 > offsetTop;
    if (visible) {
      this.started = true;
      this.scaleIn();
    }
  }

  private scaleIn(indexes: number[] = [0]) {
    window.requestAnimationFrame(() => {
      const now = Date.now();
      if (now < this.lastTimestamp + 1000 / this.fps) {
        this.scaleIn(indexes);

        return;
      }

      this.lastTimestamp = now;
      indexes.forEach((i) => {
        if (!this.tiles[i]) {
          return;
        }

        (this.tiles[i] as HTMLElement).classList.add(this.className);
      });

      const nextIndexes = indexes.map((i) => i + this.cols);
      if (indexes.length < this.cols) {
        nextIndexes.unshift(indexes[0] + 1);
      }

      if (Math.min(...nextIndexes) > this.tiles.length - 1) {
        return;
      }

      this.scaleIn(nextIndexes);
    });
  }
}
