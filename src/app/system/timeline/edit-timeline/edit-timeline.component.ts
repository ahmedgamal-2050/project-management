import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timeline } from '../../timeline';
declare let $: any;

@Component({
  selector: 'app-edit-timeline',
  templateUrl: './edit-timeline.component.html',
  styleUrls: ['./edit-timeline.component.scss']
})
export class EditTimelineComponent implements OnInit, OnChanges {
  //public projectForm!: FormGroup;
  timelineList: Timeline[] = [];
  public timelineForm!: FormGroup;
  timeline: Timeline;
  colorList: string[] = ['red', 'purple', 'yellow', 'orange', 'blue', 'black', 'cyan'];
  timelineEditMode: boolean = false;
  @Input() selectedTimeline: Timeline;
  @Output() updateTimeline: EventEmitter<Timeline> = new EventEmitter();
  @Output() createTimeline: EventEmitter<Timeline> = new EventEmitter();

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.timelineForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern('^[أ-يa-zA-Z].*')
        ]
      ],
      color: '',
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log('changes', changes);
    if (changes && changes.selectedTimeline && changes.selectedTimeline.currentValue) {
      this.selectedTimeline = changes.selectedTimeline.currentValue as Timeline;
      //console.log('selectedTimeline', this.selectedTimeline);
      this.timelineForm.controls['title'].setValue(this.selectedTimeline.title);
      this.timelineForm.controls['color'].setValue(this.selectedTimeline.color);
    }
  }

  submitTimeline() {
    if (this.timelineForm.valid && this.timelineForm.dirty) {
      if (this.selectedTimeline?.id) {
        this.selectedTimeline.title = this.timelineForm.value.title;
        this.selectedTimeline.color = this.timelineForm.value.color;
        this.updateTimeline.emit(this.selectedTimeline);
      }
      else {
        let randomNum = parseInt((Math.random() * 10000000).toFixed());
        this.timeline = {
          id: randomNum,
          title: this.timelineForm.value.title,
          color: this.timelineForm.value.color,
          projectList: [],
          archive: false,
        }
        this.createTimeline.emit(this.timeline);
      }
      this.timelineForm.reset();
      $('#timelineModal').modal('hide');
    }
    else {
      this.timelineForm.markAllAsTouched();
      this.timelineForm.markAsDirty();
    }
  }

  get title() {
    return this.timelineForm.get('title');
  }

}
