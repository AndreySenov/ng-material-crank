import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SharedRouteDataService } from '../routing/SharedRouteDataService';

export interface PageData {
  pageTitle: string;
}

export abstract class AbstractPageComponent implements OnInit {

  constructor (
    protected activatedRoute: ActivatedRoute,
    protected sharedRouteDataService: SharedRouteDataService
  ) {}

  ngOnInit(): void {
    this.sharedRouteDataService.pageTitle.next(
      this.activatedRoute.snapshot.data.pageTitle
    );
  }
}
