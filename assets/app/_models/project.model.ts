//import { ProjectTask } from "./project-task.model";

export class Project {
  constructor(public title: string,
              public description: string,
              public type: string,
              public client: string,
              public budget: number,
              public priority: boolean,
              public start: Date,
              public end: Date,

              //public projectTasks?: ProjectTask[],
              public expbudget?: number,
              public projectId?: string
              ) {}
}
