import { Component } from '@angular/core';

@Component({
  selector: 'app-activity1',
  templateUrl: './activity1.component.html',
  styleUrls: ['./activity1.component.css']
})
export class Activity1Component {
  currentYear = new Date().getFullYear();

}
