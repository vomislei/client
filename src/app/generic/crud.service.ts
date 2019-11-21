import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Page} from './page';

export abstract class CrudService<T, ID> {

  constructor(protected url: string, protected http: HttpClient) {
  }

  protected getUrl(): string {
    return this.url;
  }

  findAll(): Observable<T[]> {
    const url = `${this.getUrl()}`;
    return this.http.get<T[]>(url);
  }

  findPageable(page: number, size: number, order?: string, asc?: boolean): Observable<Page<T>> {
    let url = `${this.getUrl()}/page?page=${page}&size=${size}`;
    if (order) {
      url += `&order=${order}`;
    }
    if (asc !== undefined) {
      url += `&asc=${asc}`;
    }
    return this.http.get<Page<T>>(url);
  }

  findOne(id: ID): Observable<T> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get<T>(url);
  }

  save(t: T): Observable<T> {
    const url = `${this.getUrl()}`;
    return this.http.post<T>(url, t);
  }

  exists(id: ID): Observable<boolean> {
    const url = `${this.getUrl()}/exists/${id}`;
    return this.http.get<boolean>(url);
  }

  count(): Observable<number> {
    const url = `${this.getUrl()}/count`;
    return this.http.get<number>(url);
  }

  delete(id: ID): Observable<void> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete<void>(url);
  }
}
