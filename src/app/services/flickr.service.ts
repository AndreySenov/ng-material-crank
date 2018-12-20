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

interface PhotoSizesResponse extends FlickrResponse {
  sizes: Sizes
}

interface Sizes {
  size: Size[]
}

interface Size {
  label: string,
  width: number,
  height: number,
  source: string
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

export interface FlickrPhotoSize {
  width: number,
  height: number
}

export interface FlickrPhoto {
  id: string
  title: string
  photoUrl: string
  linkUrl?: string
  stateUrl?: string,
  size?: FlickrPhotoSize
}

declare const API_KEY: string
declare const USER_ID: string

export {
  API_KEY,
  USER_ID
}

function createFlickrPhoto(photo: Photo): FlickrPhoto {
  return {
    id: photo.id,
    title: photo.title,
    photoUrl: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
    linkUrl: `https://www.flickr.com/photos/49149898%40N04/${photo.id}`
  }
}

function createFlickrPhotoFromPhotoSet(photoSet: PhotoSet): FlickrPhoto {
  return {
    id: photoSet.primary,
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
  `method=flickr.photos.search&privacy_filter=1&per_page=30&page=`

  private static readonly PHOTOALBUMS_URL: string = FlickrService.URL_PREFIX +
  `method=flickr.photosets.getList&per_page=30&page=`

  private static readonly PHOTOALBUM_URL: string = FlickrService.URL_PREFIX +
  `method=flickr.photosets.getPhotos&privacy_filter=1&per_page=30&page=`

  private static readonly PHOTOALBUM_INFO_URL: string = FlickrService.URL_PREFIX +
  `method=flickr.photosets.getInfo&photoset_id=`

  private static readonly PHOTOSIZES_URL: string = FlickrService.URL_PREFIX +
  `method=flickr.photos.getSizes&photo_id=`

  constructor(
    private restful: RestfulService
  ) {}

  getPhotostreamPage(page: number): Promise<FlickrPhotos> {
    this.checkPage(page)
    return this.restful.get(FlickrService.PHOTOSTREAM_URL + page)
    .then((response: PhotoSearchResponse) => {
      const flickrPhotos = new FlickrPhotos(response.photos)
      flickrPhotos.photos = response.photos.photo.map(createFlickrPhoto)
      return this.mapPhotoSizes(flickrPhotos).then(() => flickrPhotos)
    })
  }

  getPhotoAlbumsPage(page: number): Promise<FlickrPhotos> {
    this.checkPage(page)
    return this.restful.get(FlickrService.PHOTOALBUMS_URL + page)
    .then((response: PhotoSetsResponse) => {
      const flickrPhotos = new FlickrPhotos(response.photosets)
      flickrPhotos.photos = response.photosets.photoset.map(createFlickrPhotoFromPhotoSet)
      return this.mapPhotoSizes(flickrPhotos).then(() => flickrPhotos)
    })
  }

  getPhotoAlbumPage(albumId: string, page: number): Promise<FlickrPhotos> {
    this.checkAlbum(albumId)
    this.checkPage(page)
    return this.restful.get(`${FlickrService.PHOTOALBUM_URL}${page}&photoset_id=${albumId}`)
    .then((response: PhotoSetResponse) => {
      const flickrPhotos = new FlickrPhotos(response.photoset)
      flickrPhotos.photos = response.photoset.photo.map(createFlickrPhoto)
      return this.mapPhotoSizes(flickrPhotos).then(() => flickrPhotos)
    })
  }

  getPhotoAlbumTitle(albumId: string): Promise<string> {
    this.checkAlbum(albumId)
    return this.restful.get(FlickrService.PHOTOALBUM_INFO_URL + albumId)
    .then((response: PhotoSetInfoResponse) => response.photoset.title._content)
  }

  private getPhotoSize(photoId: string): Promise<FlickrPhotoSize> {
    this.checkPhoto(photoId)
    return this.restful.get(FlickrService.PHOTOSIZES_URL + photoId)
    .then((response: PhotoSizesResponse) => response.sizes.size)
    .then((sizes: Size[]) => {
      const size = sizes.find(s => s.label === "Medium")
      return {
        width: size.width,
        height: size.height
      }
    })
  }

  private mapPhotoSizes(flickrPhotos: FlickrPhotos): Promise<void[]> {
    const map: { [id: string]: FlickrPhoto } = {}
    const photoPromises: Promise<void>[] = flickrPhotos.photos.map(
      (flickrPhoto: FlickrPhoto) => {
        map[flickrPhoto.id] = flickrPhoto
        return this.getPhotoSize(flickrPhoto.id).then(
          (size: FlickrPhotoSize) => {
            map[flickrPhoto.id].size = size
          })
      }
    )
    return Promise.all(photoPromises)
  }

  private checkPage(page: number): void {
    if (!page || page < 0) {
      throw new Error(`Invalid page number: ${page}`)
    }
  }

  private checkAlbum(albumId: string) {
    if (!albumId) {
      throw new Error(`Invalid album ID: ${albumId}`)
    }
  }

  private checkPhoto(photoId: string) {
    if (!photoId) {
      throw new Error(`Invalid photo ID: ${photoId}`)
    }
  }
}
