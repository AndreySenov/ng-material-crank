import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AbstractPageComponent, PageData } from '../AbstractPageComponent';
import { SharedRouteDataService } from '../../routing/SharedRouteDataService';

export interface ErrorPageData extends PageData {
  errorCode: number;
  errorTitle: string;
}

@Component({
  selector: 'error-page',
  templateUrl: './error-page.component.html',
  host: {
    'class': 'mc-error-page'
  }
})
export class ErrorPageComponent extends AbstractPageComponent {

  code: number;
  title: string;

  constructor (
    activatedRoute: ActivatedRoute,
    sharedRouteDataService: SharedRouteDataService
  ) {
    super(activatedRoute, sharedRouteDataService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.code = this.activatedRoute.snapshot.data.errorCode;
    this.title = this.activatedRoute.snapshot.data.errorTitle;
  }
}
