export interface Timeline {
  id: number;
  title: string;
  color?: string;
  projectList?: Project[];
  archive?: boolean;
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  badge?: string[];
  deadline?: Date;
  priority?: string;
  task?: Task[];
  note?: string;
  archive?: boolean;
  timelineId: number;
}

export interface Task {
  id: number;
  name: string;
  reminder?: Date;
  color?: string;
  complete?: boolean;
  archive?: boolean;
  showMenu?: boolean;
  projectId: number;
}
