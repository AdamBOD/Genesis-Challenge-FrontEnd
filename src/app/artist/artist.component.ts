import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit {
  receivedImages: any[];
  baseURL = 'https://api.gettyimages.com/v3/artists/images';
  pageIndex = 1;
  url = this.baseURL;
  artistName: string;
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private location: Location) { }

  ngOnInit() {
    this.artistName = this.route.snapshot.paramMap.get ('name');
    this.getImages (this.artistName);
  }

  getImages (artistName: string) {
    this.url = this.baseURL + `?artist_name=${artistName}&page=${this.pageIndex}&page_size=12`;

    const headerList = new HttpHeaders({
      'Api-Key': '549su8mukubjxp6xkg49gnk4',
    });

    const clientData = {'client_id': 'fjgw9c39ytqhgwfqte7aug5q',
                        'client_secret': 'SYu7ndUa8bMzBn2pJquVEa5WTNqHeh8KsGhsRzSvuS7zW',
                        'grant_type': 'client_credentials'};

    const paramsList = {'fields': 'id,caption,comp,date_submitted,title'};

    this.http.get(this.url,
                  {headers: headerList,
                  params: paramsList}
                 )
      .subscribe (receivedData => {
        console.log (receivedData);
        this.receivedImages = receivedData['images'];
      });
  }

  back () {
    this.location.back();
  }

  nextPage () {
    this.pageIndex ++;
    this.getImages(this.artistName);
  }

  prevPage () {
    this.pageIndex --;
    this.getImages(this.artistName);
  }
}
