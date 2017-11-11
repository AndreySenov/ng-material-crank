import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { FlickrPhotos, FlickrService } from '../../services/services.module';

@Injectable()
export class PhotoAlbumResolver implements Resolve<FlickrPhotos> {

  constructor(
    private flickr: FlickrService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FlickrPhotos> {
    return this.flickr.getPhotoAlbumPage(route.params['albumId'], 1);
  }
}
