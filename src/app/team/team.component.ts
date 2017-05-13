import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Observable } from 'rxjs/Observable';

import { Collaborator } from '../../helpers/collaborator';
import { Project } from '../../helpers/project';
import { ProjectService } from '../core/project.service';

@Component({
  selector: 'port-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss', '../shared/subheading.scss'],
})
export class TeamComponent implements OnInit {
  teammates: Observable<Array<[string|Collaborator]>>;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.teammates = this.projectService
      .getProjects()
      .mergeMap((projects: Project[]) => Observable.from(projects))
      .filter((project: Project) => !!project.collaborators)
      .concatMap((project: Project) => Observable
        .of(project.name)
        .combineLatest(Observable.from(project.collaborators)),
      )
      .distinct(([, collaborator]) => collaborator.name)
      .toArray();
  }
}
