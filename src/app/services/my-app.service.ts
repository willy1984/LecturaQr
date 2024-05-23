import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPkm } from '../model/data-pkm';

@Injectable({
  providedIn: 'root'
})
export class MyAppService {

  url = 'https://pokeapi.co/api/v2/pokemon'

  constructor(private http: HttpClient) { }

  buscarPk(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.url}?offset=${offset}&limit=${limit}`);
  }

  viewDetailsPoke(urlPoke: string): Observable<DataPkm> {
    return this.http.get<DataPkm>(`${this.url}/${urlPoke}`);
  }

  getImagePkm(urlImage: string): Observable<Blob> {
    return this.http.get(`${ urlImage }`, { responseType: 'blob' });
  }
}
