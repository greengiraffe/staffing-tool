import { ProjectTask } from "./project-task.model";
import { User } from "./user.model";

export class Project {
  constructor(
              public creator: any,
              public title: string,
              public description: string,
              public type: string,
              public client: string,
              public budget: number,
              public isPriority: boolean,
              public start: Date,
              public end: Date,

              public projectTasks?: ProjectTask[],
              public expBudget?: number,
              public _id?: string
              ) {}
}
