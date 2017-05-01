import { Component, OnInit } from '@angular/core';

import { Project } from '../../helpers/project';
import { ProjectService } from '../core/project.service';

@Component({
  selector: 'port-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectService
      .getProjects()
      .subscribe((projects: Project[]) => this.projects = projects);
  }
}
