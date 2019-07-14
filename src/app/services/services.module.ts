import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { FlickrService } from './flickr.service'
import { RestfulService } from './restful.service'
import { IntersectionService } from './intersection.service'

export * from './flickr.service'

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    FlickrService,
    RestfulService,
    IntersectionService
  ]
})
export class ServicesModule { }
