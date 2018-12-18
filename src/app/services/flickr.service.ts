import { Injectable } from '@angular/core'
import { RestfulService } from './restful.service'

interface FlickrResponse {
  stat: string
}

interface PaginatedContent {
  page: number,
  pages: number,
  perpage: number,
  total: number
}

interface PhotoSearchResponse extends FlickrResponse {
  photos: Photos
}

interface Photos extends PaginatedContent {
  photo: Photo[]
}

interface Photo {
  id: string,
  owner: string,
  secret: string,
  server: string,
  farm: number,
  title: string,
  ispublic: number,
  isfriend: number,
  isfamily: number,
  photoUrl: string,
  linkUrl: string
}

interface PhotoSetsResponse extends FlickrResponse {
  photosets: PhotoSets
}

interface PhotoSetResponse extends FlickrResponse {
  photoset: Photos
}

interface PhotoSetInfoResponse extends FlickrResponse {
  photoset: PhotoSet
}

interface PhotoSets extends PaginatedContent {
  photoset: PhotoSet[]
}

interface PhotoSetTitle {
  _content: string
}

interface PhotoSet {
  id: string,
  primary: string,
  secret: string,
  server: string,
  farm: number,
  photos: number,
  videos: number,
  title: PhotoSetTitle,
  photoUrl: string
}

export class FlickrPhotos implements PaginatedContent {
  page: number
  pages: number
  perpage: number
  total: number
  photos: FlickrPhoto[]

  constructor(other: PaginatedContent) {
    this.page = +other.page
    this.pages = +other.pages
    this.perpage = +other.perpage
    this.total = +other.total
  }
}

export interface FlickrPhoto {
  id: string
  title: string
  photoUrl: string
  linkUrl?: string
  stateUrl?: string
}

declare const API_KEY: string
declare const USER_ID: string

export {
  API_KEY,
  USER_ID
}

function createFlickPhoto(photo: Photo): FlickrPhoto {
  return {
    id: photo.id,
    title: photo.title,
    photoUrl: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
    linkUrl: `https://www.flickr.com/photos/49149898%40N04/${photo.id}`
  }
}

function createFlickPhotoFromPhotoSet(photoSet: PhotoSet): FlickrPhoto {
  return {
    id: photoSet.id,
    title: photoSet.title._content,
    photoUrl: `https://farm${photoSet.farm}.staticflickr.com/${photoSet.server}/${photoSet.primary}_${photoSet.secret}.jpg`,
    stateUrl: `/album/${photoSet.id}`
  }
}

@Injectable()
export class FlickrService {

  private static readonly URL_PREFIX: string =
  `https://api.flickr.com/services/rest/?api_key=${API_KEY}&user_id=${USER_ID}&format=json&nojsoncallback=1&`

  private static readonly PHOTOSTREAM_URL: string = FlickrService.URL_PREFIX +
  `method=flickr.photos.search&per_page=30&page=`

  private static readonly PHOTOALBUMS_URL: string = FlickrService.URL_PREFIX +
  `method=flickr.photosets.getList&per_page=30&page=`

  private static readonly PHOTOALBUM_URL: string = FlickrService.URL_PREFIX +
  `method=flickr.photosets.getPhotos&per_page=30&page=`

  private static readonly PHOTOALBUM_INFO_URL: string = FlickrService.URL_PREFIX +
  `method=flickr.photosets.getInfo&format=json&nojsoncallback=1&photoset_id=`

  constructor(
    private restful: RestfulService
  ) {}

  getPhotostreamPage(page: number): Promise<FlickrPhotos> {
    this.checkPage(page)
    return this.restful.get(FlickrService.PHOTOSTREAM_URL + page)
    .then((photoSearchResponse: PhotoSearchResponse) => {
      const flickrPhotos = new FlickrPhotos(photoSearchResponse.photos)
      flickrPhotos.photos = photoSearchResponse.photos.photo.map(createFlickPhoto)
      return flickrPhotos
    })
  }

  getPhotoAlbumsPage(page: number): Promise<FlickrPhotos> {
    this.checkPage(page)
    return this.restful.get(FlickrService.PHOTOALBUMS_URL + page)
    .then((photoSetsResponse: PhotoSetsResponse) => {
      const flickrPhotos = new FlickrPhotos(photoSetsResponse.photosets)
      flickrPhotos.photos = photoSetsResponse.photosets.photoset.map(createFlickPhotoFromPhotoSet)
      return flickrPhotos
    })
  }

  getPhotoAlbumPage(albumId: string, page: number): Promise<FlickrPhotos> {
    this.checkAlbum(albumId)
    this.checkPage(page)
    return this.restful.get(`${FlickrService.PHOTOALBUM_URL}${page}&photoset_id=${albumId}`)
    .then((photoSetResponse: PhotoSetResponse) => {
      const flickrPhotos = new FlickrPhotos(photoSetResponse.photoset)
      flickrPhotos.photos = photoSetResponse.photoset.photo.map(createFlickPhoto)
      return flickrPhotos
    })
  }

  getPhotoAlbumTitle(albumId: string): Promise<string> {
    this.checkAlbum(albumId)
    return this.restful.get(FlickrService.PHOTOALBUM_INFO_URL + albumId)
    .then((photoSetInfoResponse: PhotoSetInfoResponse) => photoSetInfoResponse.photoset.title._content)
  }

  private checkAlbum(albumId: string) {
    if (!albumId) {
      throw new Error(`Invalid album ID: ${albumId}`)
    }
  }

  private checkPage(page: number): void {
    if (!page || page < 0) {
      throw new Error(`Invalid page number: ${page}`)
    }
  }
}
