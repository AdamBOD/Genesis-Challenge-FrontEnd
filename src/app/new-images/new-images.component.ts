import { Component, OnInit } from '@angular/core';
// import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component ({
  selector: 'app-new-images',
  templateUrl: './new-images.component.html'
})

export class NewImagesComponent implements OnInit {
  imagesArray: any[] = [];
  searchPhrase: string;
  pageIndex = 1;
  usingSearch = false;
  // tslint:disable-next-line:max-line-length
  baseURL = `https://api.gettyimages.com/v3/search/images?page=${this.pageIndex}&page_size=12&sort_order=newest&exclude_nudity=true&graphical_styles=illustration&number_of_people=none`;
  url = this.baseURL;

  constructor (private http: HttpClient,
               private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pageIndex = 1;
      // tslint:disable-next-line:max-line-length
      this.baseURL = `https://api.gettyimages.com/v3/search/images?page=${this.pageIndex}&page_size=12&sort_order=newest&exclude_nudity=true&graphical_styles=illustration&number_of_people=none`;
      this.url = this.baseURL;
      if (params['phrase']) {
        this.searchPhrase = params['phrase'];
        this.url += '&phrase=' + params['phrase'];
        this.usingSearch = true;
        this.loadImages();
        return;
      } else {
        this.url = this.baseURL + '&phrase=healthcare';
        this.usingSearch = false;
        this.loadImages();
      }
    });
    this.url += '&phrase=healthcare';
    this.loadImages();
  }

  loadImages (): void { // Observable <HttpResponse>
    const headerList = new HttpHeaders({
      'Api-Key': '549su8mukubjxp6xkg49gnk4',
    });

    const clientData = {'client_id': 'fjgw9c39ytqhgwfqte7aug5q',
                        'client_secret': 'SYu7ndUa8bMzBn2pJquVEa5WTNqHeh8KsGhsRzSvuS7zW',
                        'grant_type': 'client_credentials'};

    const paramsList = {'fields': 'preview'};

    const imageSubscription = this.http.get(this.url,
                  {headers: headerList, params: paramsList}
                 )
      .subscribe (receivedData => {
        this.imagesArray = receivedData['images'];
        imageSubscription.unsubscribe();
      });
  }

  nextPage () {
    this.pageIndex ++;
    if (this.usingSearch) {
      const searchParms = this.route.snapshot.queryParams['phrase'];
      // tslint:disable-next-line:max-line-length
      this.baseURL = `https://api.gettyimages.com/v3/search/images?page=${this.pageIndex}&page_size=12&sort_order=newest&exclude_nudity=true&graphical_styles=illustration&number_of_people=none&phrase=${searchParms}`;
    } else {
      // tslint:disable-next-line:max-line-length
      this.baseURL = `https://api.gettyimages.com/v3/search/images?page=${this.pageIndex}&page_size=12&sort_order=newest&exclude_nudity=true&graphical_styles=illustration&number_of_people=none&phrase=healthcare`;
    }
    this.url = this.baseURL;
    this.loadImages();
  }

  prevPage () {
    this.pageIndex --;
    if (this.usingSearch) {
      const searchParms = this.route.snapshot.queryParams['phrase'];
      // tslint:disable-next-line:max-line-length
      this.baseURL = `https://api.gettyimages.com/v3/search/images?page=${this.pageIndex}&page_size=12&sort_order=newest&exclude_nudity=true&graphical_styles=illustration&number_of_people=none&phrase=${searchParms}`;
    } else {
      // tslint:disable-next-line:max-line-length
      this.baseURL = `https://api.gettyimages.com/v3/search/images?page=${this.pageIndex}&page_size=12&sort_order=newest&exclude_nudity=true&graphical_styles=illustration&number_of_people=none&phrase=healthcare`;
    }
    this.url = this.baseURL;
    this.loadImages();
  }
}
