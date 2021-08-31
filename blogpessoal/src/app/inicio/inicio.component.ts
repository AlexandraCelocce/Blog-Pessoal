import { AlertasService } from './../service/alertas.service';
import { AuthService } from './../service/auth.service';
import { user } from './../model/user';
import { tema } from './../model/tema';
import { temaService } from './../service/tema.service';
import { postagemService } from './../service/postagem.service';
import {postagem } from './../model/postagem';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: postagem = new postagem()
  listaPostagens: postagem[]
  tituloPost: string

  tema: tema = new tema()
  listaTemas: tema[]
  idTema: number
  nomeTema: string

  user: user = new user()
  idUser = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: postagemService,
    private temaService: temaService,
    public authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.getAlltemas()
    this.getAllPostagens()

    
  }

  getAlltemas(){
    this.temaService.getAlltema().subscribe((resp: tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdtema(){
    this.temaService.getByIdtema(this.idTema).subscribe((resp: tema) =>{
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllpostagens().subscribe((resp: postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: user) => {
      this.user = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postpostagem(this.postagem).subscribe((resp: postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new postagem()
      this.getAllPostagens()
    })
  }

  findByTituloPostagem(){
    if(this.tituloPost == ''){
      this.getAllPostagens()
    } else {
      this.postagemService.getByTitulopostagem(this.tituloPost).subscribe((resp: postagem[]) => {
        this.listaPostagens = resp
      })
    }
  }

  findByNomeTema(){
    if(this.nomeTema == ''){
      this.getAlltemas()
    } else {
      this.temaService.getByNometema(this.nomeTema).subscribe((resp: tema[]) => {
        this.listaTemas = resp
      })
    }
  }

}