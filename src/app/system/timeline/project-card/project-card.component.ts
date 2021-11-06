import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../timeline';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit, OnChanges {
  @Input() projectList: Project[];
  @Input() timelineId: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    //console.log('projectList', this.projectList);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.timeline && changes.timeline.currentValue) {
      this.timelineId = changes.timeline.currentValue as number;
    }
  }

  openProjectView(project?: Project) {
    this.router.navigate([`project/${project.id}`, { timelineId: this.timelineId }])
  }
}
