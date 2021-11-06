import { Component, OnInit } from '@angular/core';
import { Project, Timeline } from '../timeline';
declare let $: any;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  timelineList: Timeline[] = [];
  selectedTimeline: Timeline;
  projectList: Project[] = [];
  selectedProject: Project;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('projectList')) {
      this.projectList = JSON.parse(localStorage.getItem('projectList'));
    }
    if (localStorage.getItem('timelineList')) {
      this.timelineList = JSON.parse(localStorage.getItem('timelineList'));
      this.timelineList.forEach((timeline: Timeline) => {
        this.projectList.forEach((project: Project) => {
          if (timeline.id == project.timelineId) {
            timeline.projectList.push(project);
          }
        })
      })
    }
  }

  openTimelineModal(timeline?: Timeline) {
    $('#timelineModal').modal('show');
    if (timeline) {
      this.selectedTimeline = timeline;
    }
    else {
      this.selectedTimeline = {
        id: null,
        title: '',
        color: '',
        archive: false,
        projectList: []
      };
    }
  }

  editTimeline(timeline: Timeline) {
    for (let i = 0; i < this.timelineList.length; i++) {
      if (this.timelineList[i].id == timeline.id) {
        this.timelineList[i].title = timeline.title;
        this.timelineList[i].color = timeline.color;
      }
    }
  }

  addTimeline(timeline: Timeline) {
    this.timelineList.push(timeline);
    localStorage.setItem('timelineList', JSON.stringify(this.timelineList));
  }

  editProject(project: Project) {

  }

  addProject(project: Project) {

  }
}
