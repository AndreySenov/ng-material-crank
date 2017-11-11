import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { FlickrService } from './flickr.service';
import { RestfulService } from './restful.service';

export * from './flickr.service'

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    FlickrService,
    RestfulService
  ]
})
export class ServicesModule { }
