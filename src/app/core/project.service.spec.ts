import { ProjectService } from './project.service';

let projectService: ProjectService;
describe('ProjectService', () => {
  beforeEach(() => {
    projectService = new ProjectService();
  });

  it('should emit an array of projects', (done) => {
    projectService.getProjects().subscribe((projects) => {
      expect(projects).toBeDefined();
      done();
    });
  });
});
