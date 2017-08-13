import { ScrollService } from './scroll.service';

let scrollService: any;
let spy: jasmine.Spy;
describe('ScrollService', () => {
  beforeEach(() => {
    scrollService = new ScrollService();
    spy = spyOn(scrollService, 'scrollToID');
  });

  it('should scroll to #about', () => {
    scrollService.scrollToAbout();
    expect(spy).toHaveBeenCalledWith('about');
  });

  it('should scroll to #projects', () => {
    scrollService.scrollToProjects();
    expect(spy).toHaveBeenCalledWith('projects');
  });

  it('should scroll to #contact', () => {
    scrollService.scrollToContact();
    expect(spy).toHaveBeenCalledWith('contact');
  });
});
