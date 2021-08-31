import { AlertasService } from './../service/alertas.service';
import { temaService } from './../service/tema.service';
import { tema } from './../model/tema';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: tema = new tema()
  listaTemas: tema[]

  constructor(
    private router: Router,
    private temaService: temaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    if(environment.tipo != 'adm'){
      this.alertas.showAlertInfo('Você precisa ser adm para acessar essa rota')
      this.router.navigate(['/inicio'])
    }

    this.findAllTemas()
  }

  findAllTemas(){
    this.temaService.getAlltema().subscribe((resp: tema[]) => {
      this.listaTemas = resp
    })
  }

  cadastrar(){
     this.temaService.posttema(this.tema).subscribe((resp: tema)=>{
       this.tema = resp
       this.alertas.showAlertSuccess('Tema cadastrado com sucesso!')
       this.findAllTemas()
       this.tema = new tema()
     })
  }

}