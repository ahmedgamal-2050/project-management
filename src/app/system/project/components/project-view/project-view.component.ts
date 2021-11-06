import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project, Task } from '../../../timeline';
declare let $: any;

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  editMode: boolean = false;
  @Input() project!: Project;
  @Output() updateProject: EventEmitter<Project> = new EventEmitter();
  @Output() switchToEditMode: EventEmitter<any> = new EventEmitter();
  projectLabel: string = '';
  taskForm!: FormGroup;
  public task!: Task;
  @Input() public taskList?: Task[];
  @Input() public selectedTask!: Task;
  @Output() public addTask = new EventEmitter<Task>();
  @Output() public editTask = new EventEmitter<Task>();

  @Output() public completeTask = new EventEmitter<Task>();
  @Output() public taskArchived = new EventEmitter<Task>();
  @Output() public taskMenuToggle = new EventEmitter<Task>();
  

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[أ-يa-zA-Z].*'),
          Validators.maxLength(50)
        ]
      ],
      category: [
        '',
        [
          Validators.minLength(3),
          Validators.pattern('^[أ-يa-zA-Z].*'),
          Validators.maxLength(50)
        ]
      ],
      reminder: ['']
    });
  }

  openTaskModal() {
    $('#taskModal').modal('show');
  }

  submitTask(projectId: number) {
    if (this.taskForm.dirty && this.taskForm.valid) {
      if (this.selectedTask) {
        this.task = {
          id: this.selectedTask.id,
          name: this.taskForm.value.taskName,
          reminder: this.taskForm.value.reminder,
          archive: this.selectedTask.archive,
          complete: this.selectedTask.complete,
          showMenu: this.selectedTask.showMenu,
          projectId: projectId
        }
        this.editTask.emit(this.task);
      }
      else {
        let randomNum = parseInt((Math.random() * 10000000).toFixed());
        this.task = {
          id: randomNum,
          name: this.taskForm.value.taskName,
          reminder: this.taskForm.value.reminder,
          archive: false,
          complete: false,
          showMenu: false,
          projectId: projectId
        }
        this.addTask.emit(this.task);
      }
      this.taskForm.reset();
      $('#taskModal').modal('hide');
    } else {
      this.taskForm.markAllAsTouched();
      this.taskForm.markAsDirty();
    }
  }

  get taskName() {
    return this.taskForm.get('taskName');
  }

  get category() {
    return this.taskForm.get('category');
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log('changes', changes);
    if (changes && changes.project && changes.project.currentValue) {
      this.project = changes.project.currentValue as Project;
    }
  }

  switchMode() {
    this.switchToEditMode.emit();
  }

  openLabelModal(selectedLabel?: string) {
    if (selectedLabel) {
      this.projectLabel = selectedLabel;
    }
    else {
      this.projectLabel = '';
    }
    $('#labelModal').modal('show');
  }

  addlabel(label: string) {
    this.project.badge.push(label);
  }

  submitLabels(projectLabels: string[]) {
    this.project.badge = projectLabels;
    this.updateProject.emit(this.project);
    this.projectLabel = '';
    $('#labelModal').modal('hide');
  }

  taskCompleted(currentTask: Task) {
    this.completeTask.emit(currentTask);
  }

  archiveTask(currentTask: Task) {
    this.taskArchived.emit(currentTask);
  }

  toggleTaskMenu(currentTask: Task) {
    this.taskMenuToggle.emit(currentTask);
  }
}
