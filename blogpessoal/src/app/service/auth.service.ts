import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { userLogin } from './../model/userLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  entrar(userLogin: userLogin): Observable<userLogin>{
    return this.http.post<userLogin>('http://localhost:8080/usuarios/logar', userLogin)
  }

  cadastrar(user: user): Observable<user>{
    return this.http.post<user>('http://localhost:8080/usuarios/cadastrar', user)
  }

  getByIdUser(id: number): Observable<user>{
    return this.http.get<user>(`http://localhost:8080/usuarios/${id}`)
  }


  logado(){
    let ok: boolean = false

    if (environment.token != ''){
      ok = true
    }

    return ok
  }

  adm(){
    let ok: boolean = false

    if (environment.tipo == 'adm'){
      ok = true
    }

    return ok
  }

}