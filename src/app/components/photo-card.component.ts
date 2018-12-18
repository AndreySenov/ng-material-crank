import { Component, ElementRef, Input, AfterViewChecked } from '@angular/core'
import { FlickrPhoto } from '../services/flickr.service'
import { IntersectionService } from '../services/intersection.service'

@Component({
  selector: 'mc-photo-card',
  templateUrl: './photo-card.component.html',
  host: {
    'class': 'mc-inline-block'
  }
})
export class PhotoCard implements AfterViewChecked {

  photo: FlickrPhoto
  isLoaded: boolean

  private isObserved: boolean

  constructor(
    private el: ElementRef,
    private intersectionService: IntersectionService) {
  }

  ngAfterViewChecked(): void {
    if (!this.isObserved) {
      this.intersectionService.observe(this.el.nativeElement, (target: Element) => {
        const img = target.querySelector('img')
        img.setAttribute('src', img.getAttribute('data-src'))
      })
      this.isObserved = true
    }
  }

  @Input('mc-photo')
  set photoSetter(photo: FlickrPhoto) {
    if (!photo) {
      throw new Error('The photo is undefined.')
    }
    this.isLoaded = false
    this.photo = photo
  }

  onLoad(): void {
    this.isLoaded = true
  }
}
