import { Injectable, InjectionToken, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Serializer, NopSerializer } from '../helpers/serializers';

@Injectable({
  providedIn: 'root'
})
export class ResourceService<T extends Resource> {
  // tslint:disable-next-line: variable-name
  private url: string;

  constructor(
    private http: HttpClient,
    private api: string,
    private version: string,
    private endpoint: string,
    private serializer?: Serializer,
  ) {
    if (!this.serializer) {
      this.serializer = new NopSerializer();
    }
    this.url = `https://virtserver.swaggerhub.com/Futurex/${this.api}/${this.version}/${this.endpoint}`;
  }

  public create(item: T): Observable<T> {
    return this.http
      .post<T>(this.url, this.serializer.toJson(item))
      .pipe(map(data => data as T));
  }

  public read(): Observable<T> {
    return this.http
      .get(`${this.url}`)
      .pipe(map((data: any) => this.serializer.fromJson(data) as T));
  }

  public update(item: T): Observable<T> {
    return this.http
      .put<T>(`${this.url}/${item.id}`, this.serializer.toJson(item))
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  public delete(username: string) {
    return this.http.delete(`${this.url}?username=${username}`);
  }
}

export class Resource {
  id?: string;
}
