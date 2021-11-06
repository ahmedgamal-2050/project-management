import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EditTimelineComponent } from './edit-timeline/edit-timeline.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { TimelineViewComponent } from './timeline-view/timeline-view.component';
import { TimelineComponent } from './timeline.component';

const timelineRoutes: Routes = [
  {
    path: '',
    component: TimelineComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    TimelineComponent,
    TimelineViewComponent,
    EditTimelineComponent,
    ProjectCardComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(timelineRoutes)
  ],
  providers: []
})
export class TimelineModule { }
