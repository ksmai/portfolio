import { Injectable } from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/zip';
import { Observable } from 'rxjs/Observable';
import { animationFrame } from 'rxjs/scheduler/animationFrame';

/**
 * A service for destroying a subtree in the DOM in a bottom-up way
 */
@Injectable()
export class DestroyerService {
  /**
   * destroy the subtree rooted at el
   * @param {HTMLElement} el - the root of the subtree to be destroyed
   * @param {Observer} observer - subscriber to the stream of destruction
   * @param {Number} interval - time between successful destruction
   */
  destroy(el: any, observer: any, interval = 300) {
    const parentEl = el.nativeElement ? el.nativeElement : el;

    return Observable
      .from(this.traverse(parentEl), animationFrame)
      .filter((elem) => elem.nodeType === Node.ELEMENT_NODE
        && elem.offsetParent !== null)
      .zip(Observable.interval(interval), (elem, i) => elem)
      .do((elem: any) => {
        elem.classList.add('animated', 'hinge');
        setTimeout(() => elem.style.display = 'none', 2000);
      })
      .subscribe(observer);
  }

  /**
   * traverse a dom subtree in post-order
   * @return {HTMLElenet[]} an array of elements starting with leaf nodes
   */
  private traverse(el: any) {
    let els: any[] = [];
    if (el.hasChildNodes()) {
      const childNodes = Array.from(el.childNodes);
      childNodes.forEach((node) => els = els.concat(this.traverse(node)));
    }

    return els.concat([el]);
  }
}
