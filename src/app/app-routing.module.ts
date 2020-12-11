import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const calendarModule = () =>
  import('./calendar/calendar.module').then((x) => x.CalendarModule);

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', loadChildren: calendarModule },
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
