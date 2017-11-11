import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from '../components/components.module';
import { PageData } from './AbstractPageComponent';
import { ErrorPageComponent, ErrorPageData } from './errors/error-page.component';
import { PhotostreamComponent } from './photostream/photostream.component';
import { PhotostreamResolver } from './photostream/PhotostreamResolver';
import { PhotoAlbumsComponent } from './albums/photoalbums.component';
import { PhotoAlbumsResolver } from './albums/PhotoAlbumsResolver';
import { PhotoAlbumComponent } from './albums/photoalbum.component';
import { PhotoAlbumResolver } from './albums/PhotoAlbumResolver';
import { PhotoAlbumTitleResolver } from './albums/PhotoAlbumTitleResolver';

export {
  PageData,
  ErrorPageData,
  ErrorPageComponent,
  PhotostreamComponent,
  PhotostreamResolver,
  PhotoAlbumsComponent,
  PhotoAlbumsResolver,
  PhotoAlbumComponent,
  PhotoAlbumResolver,
  PhotoAlbumTitleResolver
}

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule
  ],
  declarations: [
    ErrorPageComponent,
    PhotostreamComponent,
    PhotoAlbumsComponent,
    PhotoAlbumComponent
  ],
  exports: [
    ErrorPageComponent,
    PhotostreamComponent,
    PhotoAlbumsComponent,
    PhotoAlbumComponent
  ],
  providers: [
    PhotostreamResolver,
    PhotoAlbumsResolver,
    PhotoAlbumResolver,
    PhotoAlbumTitleResolver
  ]
})
export class PagesModule { }
