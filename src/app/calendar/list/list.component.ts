import { Component, OnInit,  ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
  subDays,
  addDays
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  MOMENT
} from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { colors } from './colors';
import * as data from 'src/assets/events.json';
import moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';


interface Event {
  start: string,
  end: string,
  title: string,
  color: any,
  actions: any,
  allDay: boolean,
  resizable: {
    beforeStart: boolean,
    afterEnd: boolean,
  },
  draggable: boolean,
}


@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  //events declaration.
  events$: CalendarEvent<{ event: Event }>[];

  activeDayIsOpen: boolean = false;

  constructor(
    private modal: NgbModal, 
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

    setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  fetchEvents(): void { 
    let events = (data as any).default;
    this.events$ = events.map((event: Event) => {
        return {
          title: event.title,
          start: new Date(moment(event.start,'YYYY-MM-DD HH:mm').format()),
          end: new Date(moment(event.end, 'YYYY-MM-DD HH:mm').format()),
          color: event.color,
          meta: {
            event,
          },
        };
      });
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  eventClicked(event: CalendarEvent<{ event: Event }>): void {
    this.router.navigate(['/view/'+event.meta.event['id']]);
  }

}
