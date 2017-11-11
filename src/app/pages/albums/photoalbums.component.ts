import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AbstractPhotoListComponent } from '../AbstractPhotoListComponent';
import { SharedRouteDataService } from '../../routing/SharedRouteDataService';
import { FlickrPhotos, FlickrPhoto, FlickrService } from '../../services/services.module';

@Component({
  selector: 'albums',
  templateUrl: '../AbstractPhotoListComponent.html',
  host: {
    'class': 'mc-photo-card-container'
  }
})
export class PhotoAlbumsComponent extends AbstractPhotoListComponent {

  constructor(
    activatedRoute: ActivatedRoute,
    sharedRouteDataService: SharedRouteDataService,
    private router: Router,
    private flickr: FlickrService
  ) {
    super(activatedRoute, sharedRouteDataService);
  }

  onPhotoClick(photo: FlickrPhoto): void {
    this.router.navigateByUrl(photo.stateUrl);
  }

  protected doLoadMore(nextPage: number): Promise<FlickrPhotos> {
    return this.flickr.getPhotoAlbumsPage(nextPage);
  }
}
