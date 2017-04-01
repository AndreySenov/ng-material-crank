import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GeneralModule } from '../general/general.module';

import { PhotostreamComponent } from './photostream/photostream.component';
import { PhotostreamResolver } from './photostream/PhotostreamResolver';
import { PhotoAlbumsComponent } from './albums/photoalbums.component';
import { PhotoAlbumsResolver } from './albums/PhotoAlbumsResolver';
import { PhotoAlbumComponent } from './albums/photoalbum.component';
import { PhotoAlbumResolver } from './albums/PhotoAlbumResolver';
import { PhotoAlbumTitleResolver } from './albums/PhotoAlbumTitleResolver';

export {
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
    GeneralModule
  ],
  declarations: [
    PhotostreamComponent,
    PhotoAlbumsComponent,
    PhotoAlbumComponent
  ],
  exports: [
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
