import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eventsData: any[] = [];

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    // Prefer events for logged-in college
    const college = this.loginService.getCollegeData();
    if (college && (college.id || college._id)) {
      const id = college.id ? college.id : college._id;
      this.loginService.getEvents(id).subscribe({
        next: (data) => { this.eventsData = data || []; },
        error: (err) => { console.error(err); this.eventsData = []; }
      });
      return;
    }

    // Fallback: try to fetch all colleges and load events for the first one
    this.loginService.getAllColleges().subscribe({
      next: (colleges) => {
        if (colleges && colleges.length) {
          const first = colleges[0];
          const id = first.id ? first.id : first._id;
          this.loginService.getEvents(id).subscribe({
            next: (data) => { this.eventsData = data || []; },
            error: (err) => { console.error(err); this.eventsData = []; }
          });
        } else {
          // No colleges found: try to use cached events from localStorage (preserve last viewed events after logout)
          try {
            const cached = localStorage.getItem('cachedEvents');
            if (cached) {
              this.eventsData = JSON.parse(cached) || [];
            } else {
              this.eventsData = [];
            }
          } catch (e) {
            console.warn('Failed to read cached events', e);
            this.eventsData = [];
          }
        }
      },
      error: (err) => {
        console.error('Failed to load colleges; try cached events', err);
        try {
          const cached = localStorage.getItem('cachedEvents');
          this.eventsData = cached ? JSON.parse(cached) : [];
        } catch (e) {
          console.warn('Failed to read cached events', e);
          this.eventsData = [];
        }
      }
    });
  }
}
