import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { PhotoCard } from './components/photo-card.component';

import { FlickrService } from './services/flickr.service';
import { RestfulService } from './services/restful.service';

export * from './components/photo-card.component';
export * from './services/flickr.service';
export * from './services/restful.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    PhotoCard
  ],
  exports: [
    MaterialModule,
    PhotoCard
  ],
  providers: [
    FlickrService,
    RestfulService
  ]
})
export class GeneralModule { }
