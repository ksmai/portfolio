export class Collaborator {
  name: string;
  github: string;
}

export class Project {
  name: string;
  description: string;
  technology: string[];
  collaborators?: Collaborator[];
  github: string;
  url: string;
  thumbnail: string;
}
