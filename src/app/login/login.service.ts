import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Use production backend URL (or set to '/api' if you have a local proxy configured)
  private apiUrl = 'https://pmd-college-backend.onrender.com/api';
  private collegeData: any = null;

  constructor(private http: HttpClient) { }

  // ===== LOGIN =====
  login(email: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
}

saveLoginData(data: any) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
}


  getCollege() {
    const c = localStorage.getItem('college');
    return c ? JSON.parse(c) : null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }
  // ===== STORE & GET COLLEGE DATA =====
  setCollegeData(data: any) {
    this.collegeData = data;
    localStorage.setItem('collegeData', JSON.stringify(data));
  }

  getCollegeData() {
    if (this.collegeData) return this.collegeData;
    const stored = localStorage.getItem('collegeData');
    if (stored) {
      this.collegeData = JSON.parse(stored);
      return this.collegeData;
    }
    return null;
  }

 

  // ===== GET EVENTS =====
  getEvents(collegeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/college/${collegeId}/events`);
  }

  // ===== GET ALL EVENTS =====
  getAllEvents(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/events/all`);
  }

  // ===== GET ALL COLLEGES (useful if no college is logged in) =====
  getAllColleges(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/college`);
  }

  // ===== CREATE EVENT =====
  createEvent(collegeId: string, event: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/college/${collegeId}/events`, event);
  }

  // ===== UPDATE EVENT =====
  updateEvent(collegeId: string, eventId: string, event: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/college/${collegeId}/events/${eventId}`, event);
  }

  // ===== DELETE EVENT =====
  deleteEvent(collegeId: string, eventId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/college/${collegeId}/events/${eventId}`);
  }
}
