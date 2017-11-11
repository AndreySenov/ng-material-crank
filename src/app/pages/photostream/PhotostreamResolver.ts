import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { FlickrPhotos, FlickrService } from '../../services/services.module';

@Injectable()
export class PhotostreamResolver implements Resolve<FlickrPhotos> {

  constructor(
    private flickr: FlickrService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FlickrPhotos> {
    return this.flickr.getPhotostreamPage(1);
  }
}
