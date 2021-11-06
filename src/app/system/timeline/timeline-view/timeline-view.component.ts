import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Project, Timeline } from '../../timeline';

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.scss']
})
export class TimelineViewComponent implements OnInit, OnChanges {
  @Input() timelineList: Timeline[] = [];
  @Output() openTimelineModal: EventEmitter<Timeline> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.timelineList && changes.timelineList.currentValue) {
      this.timelineList = changes.timelineList.currentValue as Timeline[];
    }
  }

  openTimeline(timeline?: Timeline) {
    this.openTimelineModal.emit(timeline);
  }

  addProject(timelineId?: number) {
    this.router.navigate(['/project/add', { timelineId: timelineId }]);
  }
}
