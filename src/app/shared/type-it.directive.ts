import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[portTypeIt]',
  exportAs: 'portTypeIt',
})
export class TypeItDirective implements AfterViewInit {
  @Input('portTypeIt') autoStart = true;

  started = false;

  private lastTimestamp = Date.now();
  private textNodes: Text[] = [];
  private cursor = '_';
  private texts: string[];

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.textNodes = this.getTextNodes(this.el.nativeElement);
    this.texts = this.textNodes.map((node) => node.nodeValue);
    this.textNodes.forEach((node) => node.nodeValue = '');
    if (this.autoStart) {
      this.startTypeIt();
    }
  }

  startTypeIt(fps = 30) {
    if (this.started) {
      return;
    }

    this.started = true;

    return this
      .blinkCursor(this.textNodes[0], 4, 5)
      .then(() => {
        return this.typeIt(this.textNodes, this.texts, fps);
      });
  }

  private typeIt(nodes: Text[], texts: string[], fps = 30): Promise<any> {
    if (texts.length === 0) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const now = Date.now();
      const animate = now - this.lastTimestamp > 1000 / fps;
      if (animate) {
        nodes[0].appendData(texts[0][0]);
        this.lastTimestamp = now;
      }
      window.requestAnimationFrame(() => {
        let nextNodes: Text[];
        let nextTexts: string[];
        let blinks: Promise<any>;
        if (!animate) {
          nextNodes = nodes;
          nextTexts = texts;
          blinks = Promise.resolve();
        } else if (texts[0].length > 1) {
          nextTexts = [texts[0].slice(1), ...texts.slice(1)];
          nextNodes = nodes;
          blinks = nextTexts[0][0].match(/\S/) ?
            Promise.resolve() :
            this.blinkCursor(nodes[0], 1, fps);
        } else {
          nextTexts = texts.slice(1);
          nextNodes = nodes.slice(1);
          blinks = this.blinkCursor(nodes[0], 3, 5);
        }
        blinks.then(() => {
          return this.typeIt(nextNodes, nextTexts, fps).then(resolve);
        });
      });
    });
  }

  private blinkCursor(
    node: Text,
    total: number,
    fps = 30,
    time = 0,
  ): Promise<any> {
    if (time >= total * 2) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const now = Date.now();
      const animate = now - this.lastTimestamp > 1000 / fps;
      if (animate) {
        if (time % 2 === 0) {
          node.appendData(this.cursor);
        } else {
          node.deleteData(
            node.data.length - this.cursor.length,
            this.cursor.length,
          );
        }
        this.lastTimestamp = now;
      }

      window.requestAnimationFrame(() => {
        const nextTime = animate ? time + 1 : time;
        this.blinkCursor(node, total, fps, nextTime).then(resolve);
      });
    });
  }

  private isEmptyTextNode(node: Text): boolean {
    return !node.nodeValue || !node.nodeValue.trim();
  }

  private isTextNode(node: Node): boolean {
    return node.nodeType === Node.TEXT_NODE;
  }

  private isNonEmptyTextNode(node: Node): boolean {
    return this.isTextNode(node) && !this.isEmptyTextNode(node as Text);
  }

  private getTextNodes(node: Node): Text[] {
    const textNodes = [];

    for (let n = node.firstChild; n !== null; n = n.nextSibling) {
      if (this.isNonEmptyTextNode(n)) {
        textNodes.push(n as Text);
      } else if (n.childNodes.length > 0) {
        textNodes.push(...this.getTextNodes(n));
      }
    }

    return textNodes;
  }
}
