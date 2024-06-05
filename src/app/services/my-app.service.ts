import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataPkm } from '../model/data-pkm';
import { PostsData } from '../model/posts-data';

@Injectable({
  providedIn: 'root'
})
export class MyAppService {

  url = 'https://pokeapi.co/api/v2/pokemon';
  urlPost = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) { }

  //Pokemon
  buscarPk(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.url}?offset=${offset}&limit=${limit}`);
  }
  getImage(name: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${name}`)
    .pipe(map(a => ({
      image: a.sprites.other.dream_world.front_default
    })))
  }

  viewDetailsPoke(urlPoke: string): Observable<DataPkm> {
    return this.http.get<DataPkm>(`${this.url}/${urlPoke}`);
  }

  getImagePkm(urlImage: string): Observable<Blob> {
    return this.http.get(`${ urlImage }`, { responseType: 'blob' });
  }

  // Lista usuarios
  getPost(): Observable<PostsData[]> {
    return this.http.get<PostsData[]>(`${this.urlPost}posts`);
  }
}
