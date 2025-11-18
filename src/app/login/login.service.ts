import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api';
  private collegeData: any = null;

  constructor(private http: HttpClient) { }

  // ===== LOGIN =====
  login(id: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { id, pass: password });
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

  logout() {
    this.collegeData = null;
    localStorage.removeItem('collegeData');
  }

  // ===== GET EVENTS =====
  getEvents(collegeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/college/${collegeId}/events`);
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
