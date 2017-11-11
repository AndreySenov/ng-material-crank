import { Component, Input } from '@angular/core';

import { FlickrPhoto } from '../services/flickr.service';

@Component({
  selector: 'mc-photo-card',
  templateUrl: './photo-card.component.html',
  host: {
    'class': 'mc-inline-block'
  }
})
export class PhotoCard {

  photo: FlickrPhoto;
  isLoaded: boolean;

  @Input('mc-photo')
  set photoSetter(photo: FlickrPhoto) {
    if (!photo) {
      throw new Error('The photo is undefined.');
    }
    this.isLoaded = false;
    this.photo = photo;
  }

  onLoad(): void {
    this.isLoaded = true;
  }
}
