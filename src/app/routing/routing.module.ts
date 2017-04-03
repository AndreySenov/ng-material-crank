import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  PagesModule,
  PhotostreamComponent,
  PhotoAlbumsComponent,
  PhotoAlbumComponent,
  PhotostreamResolver,
  PhotoAlbumsResolver,
  PhotoAlbumResolver,
  PhotoAlbumTitleResolver
} from '../pages/pages.module';

import { SharedRouteDataService, TopLevelRouteData } from './SharedRouteDataService';

const routes: Routes = [
  {
    path: 'photostream',
    component: PhotostreamComponent,
    resolve: {
      initialData: PhotostreamResolver
    },
    data: <TopLevelRouteData>{
      pageTitle: 'Photostream'
    }
  },
  {
    path: 'albums',
    component: PhotoAlbumsComponent,
    resolve: {
      initialData: PhotoAlbumsResolver
    },
    data: <TopLevelRouteData>{
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
    data: <TopLevelRouteData>{}
  },
  { path: '', redirectTo: '/photostream', pathMatch: 'full' }
];

@NgModule({
  imports: [
    PagesModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    PagesModule,
    RouterModule
  ]
})
export class RoutingModule { }
