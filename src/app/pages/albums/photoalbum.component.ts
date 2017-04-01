import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AbstractPhotoListComponent } from '../AbstractPhotoListComponent';
import { SharedRouteDataService } from '../../routing/SharedRouteDataService';
import { FlickrPhotos, FlickrPhoto, FlickrService } from '../../general/general.module';

@Component({
  selector: 'album',
  templateUrl: '../AbstractPhotoListComponent.html',
  host: {
    'class': 'mc-photo-card-container'
  }
})
export class PhotoAlbumComponent extends AbstractPhotoListComponent {

  constructor(
    activatedRoute: ActivatedRoute,
    sharedRouteDataService: SharedRouteDataService,
    private flickr: FlickrService
  ) {
    super(activatedRoute, sharedRouteDataService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.sharedRouteDataService.pageTitle.next(
      this.activatedRoute.snapshot.data.pageTitle
    );
  }

  onPhotoClick(photo: FlickrPhoto): void {
    window.open(photo.linkUrl);
  }

  protected doLoadMore(nextPage: number): Promise<FlickrPhotos> {
    return this.flickr.getPhotoAlbumPage(this.activatedRoute.snapshot.params['albumId'], nextPage);
  }
}
