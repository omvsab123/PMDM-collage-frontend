import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  events: any[] = [];
  headline: string = "";
  uploadedImageUrl: string = "";

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loadEvents();
    //tocken display for debuging purpose
     this.token = localStorage.getItem("token");
  console.log("Dashboard Token:", this.token);
  }

  // Load all events
  loadEvents() {
    this.loginService.getAllEvents().subscribe({
      next: (res) => {
        this.events = res.data || [];
      },
      error: () => alert("Failed to load events")
    });
  }

  // Upload image
 // SECTION 1: Upload Image ONLY
  // uploadImage(fileInput: any) {
  //   const file = fileInput.files[0];
  //   if (!file) return alert("Please select a file");

  //   const formData = new FormData();
  //   formData.append("image", file);

  //   this.loginService.uploadImage(formData).subscribe({
  //     next: (res: any) => {
  //       this.uploadedImageUrl = res.imageUrl;   // <-- STORE URL
  //       alert("Image uploaded successfully");

  //       console.log("Uploaded Image URL:", this.uploadedImageUrl);
  //     },
  //     error: () => alert("Failed to upload image")
  //   });
  // }
 uploadImage(fileInput: any) {
  const file = fileInput.files[0];
  if (!file) return alert("Please select a file");

  const formData = new FormData();
  formData.append("image", file);

  this.loginService.uploadImage(formData).subscribe({
    next: (res: any) => {
      console.log("Upload Success:", res);
      this.uploadedImageUrl = res.imageUrl;   // use this for adding event
      alert("Image uploaded successfully");
    },
    error: (err) => {
      console.error("Upload error:", err);
      alert("Failed to upload image");
    }
  });
}



  // Add event
   // SECTION 2: Add Event with headline + uploaded image URL
  addEvent() {
    if (!this.headline || !this.uploadedImageUrl) {
      return alert("Headline and uploaded image are required");
    }

    const eventData = { 
      title: this.headline, 
      image: this.uploadedImageUrl 
    };

    this.loginService.addEvent(eventData).subscribe({
      next: () => {
        alert("Event added successfully");
        this.headline = "";
        this.uploadedImageUrl = ""; // clear
        this.loadEvents();
      },
      error: () => alert("Failed to add event")
    });
  }

  // Delete event
  deleteEvent(id: number) {
    if (!confirm("Delete this event?")) return;

    this.loginService.deleteEvent(id).subscribe({
      next: () => {
        alert("Event deleted");
        this.loadEvents();
      },
      error: () => alert("Failed to delete event")
    });
  }


  // Logout
  logout() {
  this.loginService.logout();
  // alert("Logged out successfully");
  window.location.href = "/login"; // Redirect to login page
}



// login tocken display for debuging purpose
token: string | null = "";



}
