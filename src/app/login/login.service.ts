import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://pmd-college-backend.onrender.com/api';

  constructor(private http: HttpClient) {}

  // ===== LOGIN =====
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  saveLoginData(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }

  // ===== EVENTS =====

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/events/all`);
  }

uploadImage(formData: FormData): Observable<any> {
  const token = localStorage.getItem("token");

  return this.http.post(
    "https://pmd-college-backend.onrender.com/api/events/upload-image",
    formData,
    {
      headers: {
        Authorization: token!  // 🔥 ONLY TOKEN — NO "Bearer"
      }
    }
  );
}




 addEvent(event: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/events/add`, event, {
    headers: { Authorization: this.getToken()! } // 🔥 No Bearer
  });
}

deleteEvent(eventId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/events/${eventId}`, {
    headers: { Authorization: this.getToken()! }  // 🔥 No Bearer
  });
}
}
