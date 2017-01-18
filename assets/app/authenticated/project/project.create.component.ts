import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from "../../_models/project.model";
import { ProjectTask } from "../../_models/project-task.model";
import { ProjectService } from "../../_services/project.service";
import { ModalService } from "../../_services/modal.service";
import { TaskCreateComponent } from "../task/task.create.component";
import { AuthService } from "../../_services/auth.service";


@Component({
    selector: 'app-project-create',
    templateUrl: './project.create.template.html',
    providers: [ProjectService],
    styleUrls: ['project.create.style.scss']
})
export class ProjectCreateComponent implements OnInit {
    constructor(private projectService: ProjectService,
                private authService: AuthService,
                private _flash: FlashMessagesService,
                private _fb: FormBuilder,
                private modalService: ModalService,
                private route: ActivatedRoute,
                private router: Router) {}

    project: Project;
    projectForm: FormGroup;
    projectTasks = new Array<ProjectTask>();
    addTaskModalId = "modal-add-task";
    editTaskModalIds = new Array<string>();
    isEditing: Boolean = false;

    ngOnInit() {
        this.projectForm = this._fb.group({
                title: ['', Validators.required],
                description: ['', Validators.required],
                type: ['tentative', Validators.required],
                client: ['', Validators.required],
                budget: ['', Validators.required],
                expBudget: [''],
                isPriority: ['false', Validators.required],
                projectStart: ['', Validators.required],
                projectEnd: ['', Validators.required]
            });
        if(this.router.url.includes('edit')) {
            this.prepareEdit();
        }
    }

    prepareEdit() {
        this.route.params
            .switchMap((params: Params) =>
                this.projectService.getProjectById(params['id']))
                .subscribe((project: Project) => {
                    this.project = project;
                    this.isEditing = true;
                    this.fillForm(project);
                    this.setUpModals(project);
                });
    }

    fillForm(project: Project) {
        this.projectForm = this._fb.group({
            title: [project.title, Validators.required],
            description: [project.description, Validators.required],
            type: [project.type, Validators.required],
            client: [project.client, Validators.required],
            budget: [project.budget, Validators.required],
            expBudget: [project.expBudget],
            isPriority: [project.isPriority.toString(), Validators.required],
            projectStart: [project.start.toString().substring(0,10), Validators.required],
            projectEnd: [project.end.toString().substring(0,10), Validators.required],
        });
    }

    setUpModals(project: Project) {
        project.projectTasks.forEach(task => {
            this.projectTasks.push(task);
            const taskIndex = this.projectTasks.indexOf(task);
            this.editTaskModalIds.push("editTaskModalIds" + taskIndex);
        })
    }

    addProjectTask(taskComponent: TaskCreateComponent) {
        const task = new ProjectTask(
            taskComponent.taskForm.controls["title"]["_value"],
            taskComponent.taskForm.controls["description"]["value"],
            taskComponent.task.requiredSkills,
            taskComponent.task.assignedUsers
        );

        this.projectTasks.push(task);
        var taskIndex;
        var lastModalId: string = this.editTaskModalIds[this.editTaskModalIds.length-1];
        lastModalId ? taskIndex = +lastModalId.slice(16) + 1 : taskIndex = 0
        this.editTaskModalIds.push("editTaskModalIds" + taskIndex);
        this.modalService.close(this.addTaskModalId);
        taskComponent.resetForm();
    }

    editProjectTask(index: number) {
        this.modalService.open(this.editTaskModalIds[index]);
    }

    saveEditedProjectTask(taskComponent: TaskCreateComponent, index: number) {
        const editedTask = new ProjectTask(
            taskComponent.taskForm.controls["title"]["_value"],
            taskComponent.taskForm.controls["description"]["value"],
            taskComponent.task.requiredSkills,
            taskComponent.task.assignedUsers,
            taskComponent.task.interestedUsers
        );
        this.projectTasks[index] = editedTask;
        this.modalService.close(this.editTaskModalIds[index]);
    }

    removeProjectTask(task: ProjectTask) {
        const taskIndex = this.projectTasks.indexOf(task);
        this.projectTasks.splice(taskIndex,1);
        this.editTaskModalIds.splice(taskIndex,1);
    }

    showNewTaskModal() {
        // this.emptyProjectTask = new ProjectTask("","",[]);
        this.modalService.open(this.addTaskModalId);
    }

    closeModal(modalId, taskComponent, event) {
        event.stopPropagation();
        taskComponent.resetForm();
        this.modalService.close(modalId);
    }

    onSubmit(form: FormGroup) {
        // Create
        const creator = this.isEditing ? this.project.creator._id : this.authService.currentUser()._id;

        const project = new Project(
            creator,
            form['title'],
            form['description'],
            form['type'],
            form['client'],
            form['budget'],
            (form['isPriority'] === "true"),
            form['projectStart'],
            form['projectEnd'],
            this.projectTasks,
            form['expBudget']
        );

        if(!this.isEditing) {
            this.projectService.createProject(project)
            .subscribe(
                data => {
                    this._flash.show("Project successfully added.", { cssClass: 'alert-success', timeout: 500000 });
                    this.projectForm.reset({
                        type: "tentative",
                        isPriority: "false",
                    });
                    this.projectTasks = new Array<ProjectTask>();
                },
                error => {this._flash.show(error.error.message, { cssClass: 'alert-danger', timeout: 5000 });}
            );
        } else {
            project._id = this.project._id;
            this.projectService.updateProject(project)
                .subscribe(
                    data => {
                        this.router.navigateByUrl('usr/project/show/' + this.project._id);
                    },
                    error => {this._flash.show(error.error.message, { cssClass: 'alert-danger', timeout: 5000 });}
            );
        }
    }
}
