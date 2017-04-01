import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AbstractPhotoListComponent } from '../AbstractPhotoListComponent';
import { SharedRouteDataService } from '../../routing/SharedRouteDataService';
import { FlickrPhotos, FlickrPhoto, FlickrService } from '../../general/general.module';

@Component({
  selector: 'photostream',
  templateUrl: '../AbstractPhotoListComponent.html',
  host: {
    'class': 'mc-photo-card-container'
  }
})
export class PhotostreamComponent extends AbstractPhotoListComponent {

  constructor(
    activatedRoute: ActivatedRoute,
    sharedRouteDataService: SharedRouteDataService,
    private flickr: FlickrService
  ) {
    super(activatedRoute, sharedRouteDataService);
  }

  onPhotoClick(photo: FlickrPhoto): void {
    window.open(photo.linkUrl);
  }

  protected doLoadMore(nextPage: number): Promise<FlickrPhotos> {
    return this.flickr.getPhotostreamPage(nextPage);
  }
}
