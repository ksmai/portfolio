import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { projects } from '../../data/projects';
import { Project } from '../../helpers/project';

@Injectable()
export class ProjectService {
  getProjects(): Observable<Project[]> {
    return Observable.of(projects);
  }
}
