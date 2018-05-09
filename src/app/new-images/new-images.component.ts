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
  url = 'https://api.gettyimages.com/v3/search/images?page=1&page_size=10&sort_order=newest&exclude_nudity=true&graphical_styles=illustration&number_of_people=none';

  constructor (private http: HttpClient,
               private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.url = 'https://api.gettyimages.com/v3/search/images?page=1&page_size=10&sort_order=newest&exclude_nudity=true&graphical_styles=illustration&number_of_people=none';
      if (params['phrase']) {
        this.searchPhrase = params['phrase'];
        this.url += '&phrase=' + params['phrase'];
        this.logIn();
        return;
      }
    });
    this.url += '&phrase=healthcare';
    this.logIn();
  }

  logIn (): void { // Observable <HttpResponse>
    const headerList = new HttpHeaders({
      'Api-Key': '549su8mukubjxp6xkg49gnk4',
    });

    const clientData = {'client_id': 'fjgw9c39ytqhgwfqte7aug5q',
                        'client_secret': 'SYu7ndUa8bMzBn2pJquVEa5WTNqHeh8KsGhsRzSvuS7zW',
                        'grant_type': 'client_credentials'};

    const paramsList = {'fields': 'preview'};

    this.http.get(this.url,
                  {headers: headerList, params: paramsList}
                 )
      .subscribe (receivedData => {
        this.imagesArray = receivedData['images'];
      });
  }
}
