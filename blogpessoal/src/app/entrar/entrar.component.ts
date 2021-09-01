
import { AuthService } from './../service/auth.service';
import { userLogin } from './../model/userLogin';
import { Component, OnInit } from '@angular/core';
import { user } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: user = new user
  confirmSenha: string
  tipoUser: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.confirmSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUser = event.target.value
  }

  cadastrar(){
    this.user.tipo = this.tipoUser

    if(this.user.senha != this.confirmSenha){
      alert('A senhas estão incorretas.')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: user) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      })
    }

  }


}