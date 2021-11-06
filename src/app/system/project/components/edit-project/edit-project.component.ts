import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../timeline';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  projectForm!: FormGroup;
  selectedProject!: Project;
  @Output() updateProject: EventEmitter<Project> = new EventEmitter();
  @Output() createProject: EventEmitter<Project> = new EventEmitter();
  projectId: number = 0;
  projectList: Project[] = [];
  editMode: boolean = false;
  project!: Project;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) { }

  initProjectForm() {
    this.projectForm = this.fb.group({
      title: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25)
        ]
      ],
      description: [''],
      deadline: [''],
      priority: [''],
      note: [''],
    });
  }

  ngOnInit(): void {
    this.initProjectForm();
    if (localStorage.getItem('projectList')) {
      this.projectList = JSON.parse(localStorage.getItem('projectList'));
    }
    this.projectId = this.activatedRoute.snapshot.params.id;
    if (this.projectList.length) {
      for (let i = 0; i < this.projectList.length; i++) {
        if (this.projectList[i].id == this.projectId) {
          this.selectedProject = this.projectList[i];
          this.projectForm.patchValue({
            title: this.selectedProject.title,
            description: this.selectedProject.description,
            deadline: this.selectedProject.deadline,
            priority: this.selectedProject.priority,
            note: this.selectedProject.note,
          });
        }
      }
    }
  }

  submitProject() {
    if (this.projectForm.valid && this.projectForm.dirty) {
      if (this.selectedProject) {
        this.selectedProject = {
          id: this.selectedProject.id,
          title: this.projectForm.value.title,
          badge: this.selectedProject.badge,
          description: this.projectForm.value.description,
          deadline: this.projectForm.value.deadline,
          priority: this.projectForm.value.priority,
          task: this.selectedProject.task,
          note: this.projectForm.value.note,
          timelineId: 0,
        }
        this.updateProject.emit(this.selectedProject);
      }
      else {
        let randomNum = parseInt((Math.random() * 10000000).toFixed());
        this.project = {
          id: randomNum,
          title: this.projectForm.value.title,
          badge: [],
          description: this.projectForm.value.description,
          deadline: this.projectForm.value.deadline,
          priority: this.projectForm.value.priority,
          task: [],
          note: this.projectForm.value.note,
          timelineId: 0,
        }
        this.createProject.emit(this.project);
      }
      this.projectForm.reset();
      this.editMode = false;
    }
    else {
      this.projectForm.markAsDirty();
      this.projectForm.markAllAsTouched();
    }
  }

  get title() {
    return this.projectForm.get('title');
  }
}
