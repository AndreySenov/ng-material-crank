import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class RestfulService {

  constructor(
    private http: Http
  ) {}

  get(url: string): Promise<any> {
    return this.http.get(url).toPromise()
      .then((response: Response) => JSON.parse(response.text()));
  }
}
