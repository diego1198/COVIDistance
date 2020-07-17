import { Component, OnInit } from '@angular/core';

/* Import for Auth */
import { EmailService } from '../../services/email.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;

  constructor(private authEmail:EmailService) { }

  ngOnInit() {
  }

  loginEmail(){
    this.authEmail.login(this.email,this.password).then((response)=>{

    }).catch(
      
    )
  }

  loginGoogle(){

  }

}
