import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentActiveLink;

  sortBy ($event: any, index: number) {
    if (this.currentActiveLink) {
      this.currentActiveLink.className = 'filterLink';
    }
    this.currentActiveLink = $event.target;
    this.currentActiveLink.className += ' active';
  }
}
