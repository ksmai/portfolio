import { Collaborator } from './collaborator';

export class Project {
  name: string;
  description: string;
  technology: string[];
  github: string;
  url: string;
  thumbnail: string;
  collaborators?: Collaborator[];
  showInfo?: boolean;
}
