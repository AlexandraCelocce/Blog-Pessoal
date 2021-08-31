import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tema } from '../model/tema';

@Injectable({
  providedIn: 'root'
})
export class temaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAlltema(): Observable<tema[]>{
    return this.http.get<tema[]>('http://localhost:8080/tema', this.token)
  }

  getByIdtema(id: number): Observable<tema>{
    return this.http.get<tema>(`http://localhost:8080/tema/${id}`, this.token)
  }

  getByNometema(nome: string): Observable<tema[]>{
    return this.http.get<tema[]>(`http://localhost:8080/tema/nome/${nome}`, this.token)
  }

  posttema(tema: tema): Observable<tema>{
    return this.http.post<tema>('http://localhost:8080/tema', tema, this.token)
  }

  puttema(tema: tema): Observable<tema>{
    return this.http.put<tema>('http://localhost:8080/tema', tema, this.token)
  }

  deleteTema(id: number) {
    return this.http.delete(`http://localhost:8080/tema/${id}`, this.token)
  }

}