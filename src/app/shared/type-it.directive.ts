import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[portTypeIt]',
})
export class TypeItDirective implements AfterViewInit {
  private textNodes: Text[] = [];

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    const textNodes = this.getTextNodes(this.el.nativeElement);
    const texts = textNodes.map((node) => node.nodeValue);
    textNodes.forEach((node) => node.nodeValue = '');
    setTimeout(() => this.typeIt(textNodes, texts), 2000);
  }

  private typeIt(nodes: Text[], texts: string[], cursor = false): void {
    if (texts.length === 0) {
      return;
    }

    if (cursor) {
      nodes[0].deleteData(nodes[0].data.length - 1, 1);
      window.requestAnimationFrame(() => this.typeIt(nodes, texts));

      return;
    }

    nodes[0].appendData(texts[0][0] + '_');
    window.requestAnimationFrame(() => {
      if (texts[0].length > 1) {
        const remainingTexts = [texts[0].slice(1), ...texts.slice(1)];
        const remainingNodes = nodes.slice();
        this.typeIt(remainingNodes, remainingTexts, true);
      } else {
        this.blinkCursor(nodes, texts);
      }
    });
  }

  private blinkCursor(nodes: Text[], texts: string[], time = 0, total = 9): void {
    if (time < total * 2 + 1) {
      window.requestAnimationFrame(() => {
        if (time % 2 === 0) {
          nodes[0].deleteData(nodes[0].data.length - 1, 1);
        } else {
          nodes[0].appendData('_');
        }
        this.blinkCursor(nodes, texts, time + 1, total);
      });
    } else {
      this.typeIt(nodes.slice(1), texts.slice(1));
    }
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
