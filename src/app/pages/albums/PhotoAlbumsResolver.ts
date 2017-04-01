import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { FlickrPhotos, FlickrService } from '../../general/general.module';

@Injectable()
export class PhotoAlbumsResolver implements Resolve<FlickrPhotos> {

  constructor(
    private flickr: FlickrService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FlickrPhotos> {
    return this.flickr.getPhotoAlbumsPage(1);
  }
}
