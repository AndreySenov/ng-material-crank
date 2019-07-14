import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestfulService {

  constructor(
    private httpClient: HttpClient
  ) {}

  get<T>(url: string): Promise<T> {
    return this.httpClient.get(url).toPromise()
      .then((response: T) => response);
  }
}
