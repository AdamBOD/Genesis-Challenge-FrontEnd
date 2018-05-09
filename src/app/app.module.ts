import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatTabsModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ImagesComponent } from './images/images.component';
import { NewImagesComponent } from './new-images/new-images.component';
import { MatchImagesComponent } from './match-images/match-images.component';

@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    NewImagesComponent,
    MatchImagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot ([
      {path: 'home', component: ImagesComponent},
      {path: 'new', component: NewImagesComponent},
      {path: 'match', component: MatchImagesComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]),
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
