import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { postagem } from '../model/postagem';

@Injectable({
  providedIn: 'root'
})
export class postagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllpostagens(): Observable<postagem[]>{
    return this.http.get<postagem[]>('http://localhost:8080/postagens', this.token)
  }

  getByIdpostagem(id: number): Observable<postagem>{
    return this.http.get<postagem>(`http://localhost:8080/postagens/${id}`, this.token)
  }

  getByTitulopostagem(titulo: string): Observable<postagem[]>{
    return this.http.get<postagem[]>(`http://localhost:8080/postagens/titulo/${titulo}`, this.token)
  }

  postpostagem(postagem: postagem) : Observable<postagem>{
    return this.http.post<postagem>('http://localhost:8080/postagens', postagem, this.token)
  }

  putpostagem(postagem: postagem): Observable<postagem>{
    return this.http.put<postagem>('http://localhost:8080/postagens', postagem, this.token)
  }

  deletepostagem(id: number){
    return this.http.delete(`http://localhost:8080/postagens/${id}`, this.token)
  }

}