import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService<T extends Resource> {
  // tslint:disable-next-line: variable-name
  private _url: string;
  constructor(
    private http: HttpClient,
    private url: string,
    private version: string,
    private endpoint: string,
    private serializer: Serializer
  ) {
    this._url = `${this.url}/${this.endpoint}/${this.version}/${this.endpoint}`;
  }

  public create(item: T): Observable<T> {
    return this.http
      .post<T>(this._url, this.serializer.toJson(item))
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  public read(id: number): Observable<T> {
    return this.http
      .get(`${this._url}/${id}`)
      .pipe(map((data: any) => this.serializer.fromJson(data) as T));
  }

  public update(item: T): Observable<T> {
    return this.http
      .put<T>(`${this._url}/${item.id}`, this.serializer.toJson(item))
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  public delete(id: number) {
    return this.http.delete(`${this._url}/${id}`);
  }
}

export interface Serializer {
  fromJson(json: any): Resource;
  toJson(resource: Resource): any;
}

export class Resource {
  id: number;
}
