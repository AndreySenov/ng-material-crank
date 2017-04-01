import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { FlickrService } from '../../general/general.module';

@Injectable()
export class PhotoAlbumTitleResolver implements Resolve<String> {

  constructor(
    private flickr: FlickrService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<string> {
    return this.flickr.getPhotoAlbumTitle(route.params['albumId']);
  }
}
