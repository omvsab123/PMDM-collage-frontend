import { Component, OnInit, HostListener } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eventsData: any[] = [];
  showModal = false;
  modalImageUrl: string | null = null;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.getAllEvents().subscribe({
      next: (res) => {
        this.eventsData = res.data || [];
      },
      error: () => {
        this.eventsData = [];
      }
    });
  }

  openImage(url: string) {
    this.modalImageUrl = url;
    this.showModal = true;
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.showModal = false;
    this.modalImageUrl = null;
    document.body.classList.remove('modal-open');
  }

  @HostListener('window:keydown', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.showModal) {
      this.closeModal();
    }
  }
}
