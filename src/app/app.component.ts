import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SharedRouteDataService } from './routing/SharedRouteDataService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    SharedRouteDataService
  ]
})
export class AppComponent {

  pageTitle: string;
  private pageTitleSubscription: Subscription

  constructor(
    private sharedRouteDataService: SharedRouteDataService
  ) {}

  ngOnInit(): void {
    this.pageTitleSubscription = this.sharedRouteDataService
      .pageTitle.subscribe((value: string) => this.pageTitle = value);
  }

  ngOnDestroy(): void {
    this.pageTitleSubscription.unsubscribe();
  }
}
