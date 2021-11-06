import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, Task } from '../timeline';
declare let $: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project!: Project;
  selectedProject!: Project;
  projectId: number = 0;
  addMode: boolean = false;
  editMode: boolean = false;
  projectList: Project[] = [];
  taskList: Task[] = [];
  timelineId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.timelineId = this.activatedRoute.snapshot.params.timelineId;
    if (localStorage.getItem('projectList')) {
      this.projectList = JSON.parse(localStorage.getItem('projectList'));
    }
    if (localStorage.getItem('taskList')) {
      this.taskList = JSON.parse(localStorage.getItem('taskList'));
    }
    if (this.activatedRoute.snapshot.params.id === 'add') {
      this.addMode = true;
      this.editMode = false;
    }
    else {
      this.addMode = false;
      this.editMode = false;
      this.projectId = this.activatedRoute.snapshot.params.id;
      if (this.projectList.length) {
        for (let i = 0; i < this.projectList.length; i++) {
          if (this.projectList[i].id == this.projectId) {
            this.project = this.projectList[i];
          }
        }
        

        for (let i = 0; i < this.taskList.length; i++) {
          if (this.project.id == this.taskList[i].projectId) {
            this.project.task.push(this.taskList[i]);
          }
        }
      }
      console.log(this.project);
    }
  }

  addProject(project: Project) {
    project.timelineId = this.timelineId;
    this.projectList.push(project);
    localStorage.setItem('projectList', JSON.stringify(this.projectList));
    this.router.navigate([`/project/${project.id}`, { timelineId: this.timelineId }]);
    this.addMode = false;
    this.editMode = false;
    this.project = project;
  }

  editProject(project: Project) {
    project.timelineId = this.timelineId;
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i].id == this.project.id) {
        this.projectList[i] = project;
      }
    }
    this.project = project;
    localStorage.setItem('projectList', JSON.stringify(this.projectList));
    this.router.navigate([`/project/${project.id}`, { timelineId: this.timelineId }]);
    this.addMode = false;
    this.editMode = false;
  }

  createTask(task: Task) {
    this.taskList.push(task);
    localStorage.setItem('taskList', JSON.stringify(this.taskList));
  }

  taskCompleted(currentTask: Task) {
    this.taskList.forEach((task: Task) => {
      if (task.id === currentTask.id) {
        task.complete = !task.complete;
      }
    })
  }

  archiveTask(currentTask: Task) {
    this.taskList.forEach((task: Task) => {
      if (task.id === currentTask.id) {
        task.archive = !task.archive;
      }
    })
  }

  toggleTaskMenu(currentTask: Task) {
    this.taskList.forEach((task: Task) => {
      if (task.id === currentTask.id) {
        task.showMenu = !task.showMenu;
      }
    })
  }
}
