import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './project.component';
import { ProjectViewComponent } from './components/project-view/project-view.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';

const projectRoutes: Routes = [
  {
    path: ':id',
    component: ProjectComponent
  },
  {
    path: 'add',
    component: ProjectComponent
  }
];

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectViewComponent,
    EditProjectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(projectRoutes)
  ]
})
export class ProjectModule { }
