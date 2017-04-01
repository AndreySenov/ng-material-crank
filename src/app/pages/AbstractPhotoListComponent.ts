import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { FlickrPhotos, FlickrPhoto } from '../general/general.module';
import { SharedRouteDataService } from '../routing/SharedRouteDataService';

export abstract class AbstractPhotoListComponent implements OnInit {

  photos: FlickrPhoto[];
  isShowMoreButtonDisabled: boolean;
  private totalPages: number;
  private currentPage: number;

  constructor (
    protected activatedRoute: ActivatedRoute,
    protected sharedRouteDataService: SharedRouteDataService
  ) {}

  abstract onPhotoClick(photo: FlickrPhoto): void;
  protected abstract doLoadMore(nextPage: number): Promise<FlickrPhotos>;

  ngOnInit(): void {
    this.sharedRouteDataService.pageTitle.next(
      this.activatedRoute.snapshot.data.pageTitle
    );
    const resolvedItems: FlickrPhotos =
      this.activatedRoute.snapshot.data.initialData;
    this.totalPages = resolvedItems.pages;
    this.currentPage = resolvedItems.page;
    this.photos = resolvedItems.photos;
  }

  hasMore(): boolean {
    return this.currentPage < this.totalPages;
  }

  loadMore(): void {
    this.isShowMoreButtonDisabled = true;
    const nextPage: number = this.currentPage + 1;
    this.doLoadMore(nextPage)
      .then((response: FlickrPhotos) => {
        this.photos = this.photos.concat(response.photos);
        this.currentPage = response.page;
      })
      .then(() => this.isShowMoreButtonDisabled = false);
  }
}
