import { Injectable } from "@angular/core";
import { Project } from "../_models/project.model";
import { User } from "../_models/user.model";

@Injectable()
export class RightsService {

    canEditTask(project: Project, user: User): boolean {
        return user.role === "admin" || project.creator._id === user._id;
    }

    canDeleteTask(project: Project, user: User): boolean {
        return this.canEditTask(project, user);
    }

    canDeleteProject(project: Project, user: User): boolean {
        return user.role === "admin" || project.creator._id === user._id;
    }

    canEditProject(project: Project, user: User): boolean {
        let isAssignedUser = user => {
            for(let task of project.projectTasks) {
                for(let assignedUser of task.assignedUsers) {
                    if(assignedUser._id === user._id) {
                        return true;
                    }
                }
            }
        };

        return user.role === 'admin' ||
            project.creator._id === user._id ||
            isAssignedUser(user);
    }

    canRemoveSkill(user: User): boolean {
        return user.role === 'admin' || user.role === 'user_creator'
    }

    canRemoveUser(user: User): boolean {
        return user.role === 'admin' || user.role === 'user_creator'
    }

}
