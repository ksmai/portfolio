import { Component, HostListener, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Project } from '../../helpers/project';
import { ProjectService } from '../core/project.service';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'port-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss', '../shared/subheading.scss'],
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  cols = 1;

  constructor(
    private projectService: ProjectService,
    private dialog: MdDialog,
  ) {
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

    const options = {
      data: {
        title: project.name,
        content: project.description,
        positive: 'DEMO',
        negative: 'SOURCE',
        positiveLink: project.url,
        negativeLink: project.github,
      },
    };

    if (this.cols > 1) {
      Object.assign(options, { width: '500px' });
    }

    this.dialog.open(DialogComponent, options);
  }

  @HostListener('window:resize')
  private onResize() {
    this.cols = window && window.innerWidth > 800 ? 2 : 1;
  }
}
