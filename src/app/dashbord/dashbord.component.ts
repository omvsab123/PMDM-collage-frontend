import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  collegeInfo: any;
  events: any[] = [];
  editingEventId: string | null = null;
  editHeadline: string = '';
  editUrl: string = '';
  addingEvent = false;
  newHeadline: string = '';
  newUrl: string = '';
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    const stored = this.loginService.getCollegeData();
    if (!stored || !stored.id) {
      this.router.navigate(['/login']);
      return;
    }
    this.collegeInfo = stored;
    this.loadEvents();
  }

  loadEvents() {
    if (!this.collegeInfo) return;
    this.loginService.getEvents(this.collegeInfo.id).subscribe(
      (res) => {
        this.events = res || [];
        try {
          localStorage.setItem('cachedEvents', JSON.stringify(this.events));
        } catch (e) {
          console.warn('Failed to cache events', e);
        }
      },
      (err) => {
        console.error('Failed to load events', err);
        this.events = [];
      }
    );
  }

  // ===== ADD EVENT =====
  showAddForm() {
    this.addingEvent = true;
    this.newHeadline = '';
    this.newUrl = '';
    this.message = '';
  }

  cancelAdd() {
    this.addingEvent = false;
    this.newHeadline = '';
    this.newUrl = '';
    this.message = '';
  }

  addNewEvent() {
    if (!this.newHeadline || !this.newUrl) {
      this.message = 'Please fill headline and URL';
      this.messageType = 'error';
      return;
    }

    const newEvent = {
      headline: this.newHeadline,
      url: this.newUrl
    };

    this.loginService.createEvent(this.collegeInfo.id, newEvent).subscribe(
      (res) => {
        this.message = '✓ Event added successfully';
        this.messageType = 'success';
        this.events.push(res);
        try { localStorage.setItem('cachedEvents', JSON.stringify(this.events)); } catch(e){/* ignore */}
        this.newHeadline = '';
        this.newUrl = '';
        this.addingEvent = false;
      },
      (err) => {
        this.message = 'Failed to add event';
        this.messageType = 'error';
      }
    );
  }

  // ===== EDIT EVENT =====
  startEdit(event: any) {
    this.editingEventId = event.id || event._id;
    this.editHeadline = event.headline;
    this.editUrl = event.url;
    this.message = '';
  }

  cancelEdit() {
    this.editingEventId = null;
    this.editHeadline = '';
    this.editUrl = '';
    this.message = '';
  }

  updateEvent() {
    if (!this.editHeadline || !this.editUrl) {
      this.message = 'Please fill headline and URL';
      this.messageType = 'error';
      return;
    }

    const updatedEvent = {
      headline: this.editHeadline,
      url: this.editUrl
    };

    this.loginService.updateEvent(this.collegeInfo.id, this.editingEventId!, updatedEvent).subscribe(
      (res) => {
        this.message = '✓ Event updated successfully';
        this.messageType = 'success';
        const index = this.events.findIndex(e => (e.id || e._id) === this.editingEventId);
        if (index > -1) {
          this.events[index] = res;
          try { localStorage.setItem('cachedEvents', JSON.stringify(this.events)); } catch(e){/* ignore */}
        }
        this.editingEventId = null;
        this.editHeadline = '';
        this.editUrl = '';
      },
      (err) => {
        this.message = 'Failed to update event';
        this.messageType = 'error';
      }
    );
  }

  // ===== DELETE EVENT =====
  deleteEvent(eventId: string) {
    if (!confirm('Delete this event?')) return;

    this.loginService.deleteEvent(this.collegeInfo.id, eventId).subscribe(
      (res) => {
        this.message = '✓ Event deleted successfully';
        this.messageType = 'success';
        this.events = this.events.filter(e => (e.id || e._id) !== eventId);
        try { localStorage.setItem('cachedEvents', JSON.stringify(this.events)); } catch(e){/* ignore */}
      },
      (err) => {
        this.message = 'Failed to delete event';
        this.messageType = 'error';
      }
    );
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
