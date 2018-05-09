import { Component, OnInit } from '@angular/core';
// import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component ({
  selector: 'app-best-images',
  templateUrl: './best-images.component.html'
})

export class BestImagesComponent implements OnInit {
  imagesArray: any[];
  constructor (private http: HttpClient) {}

  ngOnInit(): void {
    this.logIn();
  }

  logIn (): void { // Observable <HttpResponse>
    const headerList = new HttpHeaders({
      'Api-Key': '549su8mukubjxp6xkg49gnk4',
    });

    const clientData = {'client_id': 'fjgw9c39ytqhgwfqte7aug5q',
                        'client_secret': 'SYu7ndUa8bMzBn2pJquVEa5WTNqHeh8KsGhsRzSvuS7zW',
                        'grant_type': 'client_credentials'};

    this.http.get('https://api.gettyimages.com/v3/search/images', {headers: headerList})
      .subscribe (receivedData => {
        console.log (receivedData['images'][0].display_sizes[0].uri);
        this.imagesArray = receivedData['images'];
      });
  }
}
