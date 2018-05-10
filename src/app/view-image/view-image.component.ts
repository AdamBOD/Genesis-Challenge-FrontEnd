import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html'
})
export class ViewImageComponent implements OnInit {
  receivedImage: any;
  baseURL = 'https://api.gettyimages.com/v3/images';
  url = this.baseURL;
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private location: Location) { }

  ngOnInit() {
    this.getImage (this.route.snapshot.paramMap.get ('id'));
  }

  getImage (imageID: string) {
    this.url += `/${imageID}`;

    const headerList = new HttpHeaders({
      'Api-Key': '549su8mukubjxp6xkg49gnk4',
    });

    const clientData = {'client_id': 'fjgw9c39ytqhgwfqte7aug5q',
                        'client_secret': 'SYu7ndUa8bMzBn2pJquVEa5WTNqHeh8KsGhsRzSvuS7zW',
                        'grant_type': 'client_credentials'};

    const paramsList = {'fields': 'preview,detail_set'};

    this.http.get(this.url,
                  {headers: headerList, params: paramsList}
                 )
      .subscribe (receivedData => {
        this.receivedImage = receivedData['images'];
      });
  }

  back () {
    this.location.back();
  }
}
