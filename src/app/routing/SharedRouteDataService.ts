import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SharedRouteDataService {
  readonly pageTitle: Subject<string> = new Subject();
}
