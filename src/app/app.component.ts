import { Component, OnInit } from '@angular/core';
import { Project, Timeline } from './system/timeline';
declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  timelineList: Timeline[];
  projectList: Project[];
  timeline: Timeline;
  colorList: string[] = ['red', 'purple', 'yellow', 'orange', 'blue', 'black', 'cyan'];
  timelineModalDisplay: string = 'none';
  timelineEditMode: boolean = false;
  selectedTimeline: Timeline;

  //public task!: Task;
  constructor() { }

  ngOnInit(): void {}

  openTimelineModal(timeline?: Timeline) {
    if (timeline) {
      this.timelineEditMode = true;
      $('#timelineModal').modal('show');
      this.selectedTimeline = timeline;
    }
  }
}
