import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface TopLevelRouteData {
  pageTitle: string;
}

@Injectable()
export class SharedRouteDataService {
  readonly pageTitle: Subject<string> = new Subject();
}
