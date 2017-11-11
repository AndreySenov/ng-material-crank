import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MaterialModule } from './material.module';

import { PhotoCard } from './components/photo-card.component';

import { FlickrService } from './services/flickr.service';
import { RestfulService } from './services/restful.service';

export * from './components/photo-card.component';
export * from './services/flickr.service';
export * from './services/restful.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpModule
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
