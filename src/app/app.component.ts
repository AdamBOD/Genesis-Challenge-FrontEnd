import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  currentActiveLink;
  constructor (private route: ActivatedRoute,
               private router: Router,
               private translate: TranslateService) {
                translate.addLangs(['en', 'fr']);
                translate.setDefaultLang('en');
                const browserLang = translate.getBrowserLang();
                translate.use(browserLang.match(/en|fr/) ? browserLang : 'fr');
               }

  ngOnInit () {}

  search (value: string) {
    if (value) {
      const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
      queryParams['phrase'] = value;
      this.router.navigate(['.'], { queryParams: queryParams });
    } else {
      this.router.navigate(['.']);
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
