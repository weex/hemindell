export interface ShakespeareProject {
  id: string;
  name: string;
  initialPrompt: string;
  generalNotes: string;
  textIds: string[];
  githubUrl: string;
  publishingUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  name: string;
  initialPrompt: string;
  generalNotes?: string;
  textIds?: string[];
  githubUrl?: string;
  publishingUrl?: string;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  id: string;
}