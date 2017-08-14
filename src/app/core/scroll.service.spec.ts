import { ScrollService } from './scroll.service';

let scrollService: any;
let spy: jasmine.Spy;
describe('ScrollService', () => {
  beforeEach(() => {
    scrollService = new ScrollService();
    spy = spyOn(scrollService, 'scrollToID')
      .and.callFake((id: string, cb: any) => cb());
  });

  it('should scroll to #about and call done', (done) => {
    const cb = () => {
      expect(spy).toHaveBeenCalledWith('about', cb);
      done();
    };
    scrollService.scrollToAbout(cb);
  });

  it('should scroll to #projects and call done', (done) => {
    const cb = () => {
      expect(spy).toHaveBeenCalledWith('projects', cb);
      done();
    };
    scrollService.scrollToProjects(cb);
  });

  it('should scroll to #contact and call done', (done) => {
    const cb = () => {
      expect(spy).toHaveBeenCalledWith('contact', cb);
      done();
    };
    scrollService.scrollToContact(cb);
  });
});
