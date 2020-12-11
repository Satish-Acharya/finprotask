import { Component, OnInit } from '@angular/core';
import * as data from 'src/assets/events.json';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: number;
  event:any;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    let events = (data as any).default;
    this.event =  events.filter(event =>{ return event.id == this.id ? true : false;}).reduce((acc,event) => { 
        return (acc = event);
    }, {});
  }

}
