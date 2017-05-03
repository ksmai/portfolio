import { Component, OnInit, HostListener } from '@angular/core';

import { Project } from '../../helpers/project';
import { ProjectService } from '../core/project.service';

@Component({
  selector: 'port-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  cols = 1;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectService
      .getProjects()
      .subscribe((projects: Project[]) => {
        this.projects = projects;
        this.onResize();
      });
  }

  showProject(evt: any, project: Project) {
    if (evt.target.tagName.match(/^a$/i)) {
      return;
    }
    console.log(project);
  }

  @HostListener('window:resize')
  private onResize() {
    this.cols = window && window.innerWidth > 800 ? 2 : 1;
  }
}
