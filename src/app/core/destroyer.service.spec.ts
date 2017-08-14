import { DestroyerService } from './destroyer.service';

describe('DestroyerService', () => {
  let destroyerService: DestroyerService;
  let rootEl: HTMLElement;
  let childEl: HTMLElement;

  beforeEach(() => {
    destroyerService = new DestroyerService();
    rootEl = document.createElement('div');
    childEl = document.createElement('div');
    rootEl.appendChild(childEl);
    document.body.appendChild(rootEl);
  });

  it('should add class to each element bottom-up', (done) => {
    let count = 0;
    const next = (el: HTMLElement) => {
      if (count === 0) {
        expect(el).toBe(childEl);
        expect(el.classList.contains('animated')).toBe(true);
        count++;
      } else {
        expect(el).toBe(rootEl);
        expect(el.classList.contains('animated')).toBe(true);
        done();
      }
    };
    destroyerService.destroy(rootEl, { next });
  });
});
