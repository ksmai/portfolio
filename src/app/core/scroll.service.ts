import { Injectable } from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { Subscription } from 'rxjs/Subscription';

const BezierEasing = require('bezier-easing');

@Injectable()
export class ScrollService {
  private fps = 40;
  private subscription: Subscription;
  private lastTimestamp = Date.now();
  private ease = BezierEasing(0.74, -0.28, 0, 1);

  scrollToAbout() {
    this.scrollToID('about');
  }

  scrollToProjects() {
    this.scrollToID('projects');
  }

  scrollToContact() {
    this.scrollToID('contact');
  }

  scrollToTeam() {
    this.scrollToID('team');
  }

  private scrollToID(id: string) {
    const el = document.getElementById(id) as HTMLElement;
    if (!el) {
      return;
    }

    const targetOffset = this.computeTargetOffset(el);

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = Observable
      .from(this.generatePoints(targetOffset), animationFrame)
      .concatMap((offset: number) => {
        const delay = Math.max(
          0,
          1000 / this.fps - Date.now() + this.lastTimestamp,
        );

        return Observable.of(offset).delay(delay);
      })
      .subscribe((offset: number) => this.tick(offset));
  }

  private computeTargetOffset(el: HTMLElement): number {
    let currentEl = el;
    const offsetParents: HTMLElement[] = [];
    while (currentEl !== document.body) {
      offsetParents.push(currentEl);
      currentEl = currentEl.offsetParent as HTMLElement;
    }

    const targetOffset = offsetParents.reduce(
      (offset: number, ele: HTMLElement) => offset + ele.offsetTop,
      0,
    );

    return targetOffset;
  }

  private generatePoints(targetOffset: number): number[] {
    const currentOffset = window.scrollY;
    const delta = targetOffset - currentOffset;
    const nFrames = Math.min(
      Math.floor(Math.abs(delta) / 30),
      this.fps * 2,
    );

    return Array(nFrames)
      .fill(null)
      .map((e: number, i: number) => {
        return currentOffset + delta * this.ease(i / (nFrames - 1));
      });
  }

  private tick(targetOffset: number) {
    this.lastTimestamp = Date.now();
    window.scrollTo(window.scrollX, targetOffset);
  }
}
