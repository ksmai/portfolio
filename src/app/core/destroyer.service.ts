import { Injectable } from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/zip';
import { Observable } from 'rxjs/Observable';
import { animationFrame } from 'rxjs/scheduler/animationFrame';

@Injectable()
export class DestroyerService {
  private colors = [
    '#f44336',
    '#9c27b0',
    '#3f51b5',
    '#03a9f4',
    '#4caf50',
    '#ffeb3b',
    '#ff9800',
    '#ff5722',
  ];

  destroy(el: any, observer: any, interval = 300) {
    const parentEl = el.nativeElement ? el.nativeElement : el;

    return Observable
      .from(this.traverse(parentEl), animationFrame)
      .filter((elem) => elem.nodeType === Node.ELEMENT_NODE
        && elem.offsetParent !== null)
      .zip(Observable.interval(interval), (elem, i) => elem)
      .do((elem: any) => {
        parentEl.appendChild(this.getDebris());
        parentEl.appendChild(this.getDebris());
        if (elem.parentNode) {
          elem.parentNode.replaceChild(this.getDebris(), elem);
        }
      })
      .subscribe(observer);
  }

  private getDebris(transitionTime: number = 500): HTMLElement {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.zIndex = '1000';
    const size = this.randomSize();
    div.style.height = size;
    div.style.width = size;
    div.style.top = this.randomPos();
    div.style.left = this.randomPos();
    div.style.transform = 'scale(0)';
    div.style.opacity = '1';
    setTimeout(() => {
      div.style.transform = 'scale(2)';
      div.style.opacity = '0';
    }, 0);

    const time = this.randomTime(transitionTime);
    div.style.transition = `all ${time}ms ease-in`;

    const color = this.randomColor();
    for (let i = 0; i < 9; i++) {
      const child = document.createElement('div');
      child.style.height = '7%';
      child.style.width = '7%';
      child.style.backgroundColor = color;
      child.style.position = 'absolute';

      const col = i % 3;
      if (col === 0) {
        child.style.left = '0';
      } else if (col === 1) {
        child.style.left = '46.5%';
      } else {
        child.style.right = '0';
      }

      const row = Math.floor(i / 3);
      if (row === 0) {
        child.style.top = '0';
      } else if (row === 1) {
        child.style.top = '46.5%';
      } else {
        child.style.bottom = '0';
      }

      const deg = Math.random() * 45;
      child.style.transform = `rotate(${deg}deg)`;

      div.appendChild(child);
    }

    return div;
  }

  private traverse(el: any) {
    let els: any[] = [];
    if (el.hasChildNodes()) {
      const childNodes = Array.from(el.childNodes);
      childNodes.forEach((node) => els = els.concat(this.traverse(node)));
    }

    return els.concat([el]);
  }

  private randomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  private randomSize(): string {
    const rand = Math.random() * 10 + 5;

    return `${rand}vw`;
  }

  private randomPos(): string {
    const pos = Math.random() * 60 + 20;

    return `${pos}%`;
  }

  private randomTime(baseTime: number): number {
    return (Math.random() * 0.2 - 0.1 + 1) * baseTime;
  }
}
