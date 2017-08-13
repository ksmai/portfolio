import { Component, HostListener, OnInit } from '@angular/core';

import { Project } from '../../helpers/project';
import { ProjectService } from '../core/project.service';

@Component({
  selector: 'port-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss', '../shared/subheading.scss'],
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  cols = 1;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService
      .getProjects()
      .subscribe((projects: Project[]) => {
        this.projects = projects;
        this.onResize();
      });
  }

  @HostListener('window:resize')
  private onResize() {
    this.cols = window && window.innerWidth > 800 ? 2 : 1;
  }
}
