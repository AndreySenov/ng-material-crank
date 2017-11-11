import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  PagesModule,
  PageData,
  ErrorPageData,
  ErrorPageComponent,
  PhotostreamComponent,
  PhotoAlbumsComponent,
  PhotoAlbumComponent,
  PhotostreamResolver,
  PhotoAlbumsResolver,
  PhotoAlbumResolver,
  PhotoAlbumTitleResolver
} from '../pages/pages.module';

import { SharedRouteDataService } from './SharedRouteDataService';

const routes: Routes = [
  {
    path: 'photostream',
    component: PhotostreamComponent,
    resolve: {
      initialData: PhotostreamResolver
    },
    data: <PageData>{
      pageTitle: 'Photostream'
    }
  },
  {
    path: 'albums',
    component: PhotoAlbumsComponent,
    resolve: {
      initialData: PhotoAlbumsResolver
    },
    data: <PageData>{
      pageTitle: 'Albums'
    }
  },
  {
    path: 'album/:albumId',
    component: PhotoAlbumComponent,
    resolve: {
      initialData: PhotoAlbumResolver,
      pageTitle: PhotoAlbumTitleResolver
    },
    data: <PageData>{}
  },
  {
    path: '',
    redirectTo: '/photostream',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ErrorPageComponent,
    data: <ErrorPageData>{
      pageTitle: 'Page Not Found',
      errorCode: 404,
      errorTitle: 'Not Found'
    }
  }
];

@NgModule({
  imports: [
    PagesModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    PagesModule,
    RouterModule
  ],
  providers: [
    SharedRouteDataService
  ],
})
export class RoutingModule { }
