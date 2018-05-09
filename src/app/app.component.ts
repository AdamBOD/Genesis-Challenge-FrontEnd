import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  currentActiveLink;
  constructor (private route: ActivatedRoute,
               private router: Router) {}

  ngOnInit () {}

  search (value: string) {
    if (value) {
      const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
      queryParams['phrase'] = value;
      this.router.navigate(['.'], { queryParams: queryParams });
    }
  }

  sortBy ($event: any, index: number) {
    if (this.currentActiveLink) {
      this.currentActiveLink.className = 'filterLink';
    }
    this.currentActiveLink = $event.target;
    this.currentActiveLink.className += ' active';
  }
}
