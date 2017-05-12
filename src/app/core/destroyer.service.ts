import { Injectable } from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/zip';
import { Observable } from 'rxjs/Observable';
import { animationFrame } from 'rxjs/scheduler/animationFrame';

@Injectable()
export class DestroyerService {
  destroy(el: any, observer: any, interval = 300) {
    const parentEl = el.nativeElement ? el.nativeElement : el;

    return Observable
      .from(this.traverse(parentEl), animationFrame)
      .filter((elem) => elem.nodeType === Node.ELEMENT_NODE
        && elem.offsetParent !== null)
      .zip(Observable.interval(interval), (elem, i) => elem)
      .do((elem: any) => {
        if (elem.parentNode) {
          elem.parentNode.replaceChild(this.getDebris(), elem);
        }
      })
      .subscribe(observer);
  }

  private getDebris(transitionTime: number = 500): HTMLElement {
    const div = document.createElement('div');
    div.style.height = '10vw';
    div.style.width = '10vw';
    div.style.position = 'absolute';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.transition = `all ${transitionTime}ms ease-in`;

    for (let i = 0; i < 9; i++) {
      const child = document.createElement('div');
      child.style.height = '1vw';
      child.style.width = '1vw';
      child.style.backgroundColor = '#f60';
      child.style.position = 'absolute';

      const col = i % 3;
      if (col === 0) {
        child.style.left = '0';
      } else if (col === 1) {
        child.style.left = '4.5vw';
      } else {
        child.style.right = '0';
      }

      const row = Math.floor(i / 3);
      if (row === 0) {
        child.style.top = '0';
      } else if (row === 1) {
        child.style.top = '4.5vw';
      } else {
        child.style.bottom = '0';
      }

      const deg = Math.random() * 90;
      child.style.transform = `rotate(${deg}deg)`;

      div.appendChild(child);
    }
    div.style.transform = 'scale(0)';
    div.style.opacity = '1';
    setTimeout(() => {
      div.style.transform = 'scale(2)';
      div.style.opacity = '0';
    }, 0);

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
}
