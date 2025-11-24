import { Component, OnInit, HostListener } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eventsData: any[] = [];
  showModal: boolean = false;
  modalImageUrl: string | null = null;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    // Prefer events for logged-in college if present, otherwise try /events/all
    // ALWAYS get full events list
this.loginService.getAllEvents().subscribe({
  next: (res) => {
      console.log("🔥 RAW EVENTS RESPONSE:", res);   // <--- HERE
    console.log('Home - raw events response:', res);
    this.eventsData = this.parseEventsResponse(res);
    console.log('Home - parsed events count:', this.eventsData.length);
  },
  error: (err) => {
    console.error('Failed to load all events', err);
    this.eventsData = [];
  }
});


    // No college in session: try to fetch all events from backend
    this.loginService.getAllEvents().subscribe({
      next: (res) => {
        console.log('Home - raw events response:', res);
        this.eventsData = this.parseEventsResponse(res);
        console.log('Home - parsed events count:', this.eventsData.length);
      },
      error: (err) => {
        console.error('Failed to load all events; falling back to colleges flow', err);
        // Fallback: try to fetch all colleges and load events for the first one
        this.loginService.getAllColleges().subscribe({
          next: (colleges) => {
            if (colleges && colleges.length) {
              const first = colleges[0];
              const id = first.id ? first.id : first._id;
              this.loginService.getEvents(id).subscribe({
                next: (data) => { this.eventsData = this.parseEventsResponse(data); },
                error: (e) => { console.error(e); this.eventsData = []; }
              });
            } else {
              try {
                const cached = localStorage.getItem('cachedEvents');
                this.eventsData = cached ? JSON.parse(cached) : [];
              } catch (e) {
                console.warn('Failed to read cached events', e);
                this.eventsData = [];
              }
            }
          },
          error: (e) => {
            console.error('Failed to load colleges as fallback', e);
            try {
              const cached = localStorage.getItem('cachedEvents');
              this.eventsData = cached ? JSON.parse(cached) : [];
            } catch (ex) {
              console.warn('Failed to read cached events', ex);
              this.eventsData = [];
            }
          }
        });
      }
    });
  }

  // Accept flexible response formats: array, { data: [] }, { events: [] }, or wrapped object
 parseEventsResponse(res: any): any[] {
  if (!res) return [];

  // direct array
  if (Array.isArray(res)) return res;

  // backend uses wrong spelling "sucess"
  const isSuccess = res.success || res.sucess;

  // check data array
  if (res.data && Array.isArray(res.data)) return res.data;

  // check events array
  if (res.events && Array.isArray(res.events)) return res.events;

  // check other nested arrays
  for (const k of Object.keys(res)) {
    if (Array.isArray(res[k])) return res[k];
  }

  return [];
}


  openImage(url: string | undefined | null) {
    if (!url) return;
    this.modalImageUrl = url;
    this.showModal = true;
    // prevent background scrolling while modal is open
    try { document.body.classList.add('modal-open'); } catch (e) {/* ignore server-side rendering */}
  }

  closeModal() {
    this.showModal = false;
    this.modalImageUrl = null;
    try { document.body.classList.remove('modal-open'); } catch (e) {/* ignore */}
  }

  @HostListener('window:keydown', ['$event'])
  onEscape(event: Event) {
    const ev = event as KeyboardEvent;
    if (ev.key === 'Escape' || ev.key === 'Esc') {
      if (this.showModal) this.closeModal();
    }
  }
}
