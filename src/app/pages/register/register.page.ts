import { Component, OnInit } from '@angular/core';

import { EmailService } from '../../services/email.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name:string;
  lastName:string;
  email:string;
  password:string;

  constructor(private authEmail:EmailService) { }

  ngOnInit() {
  }

  register(){
    try {
      const user = this.authEmail.register(this.email,this.password)
      if(user){
        console.log(user)
      }
    } catch (error) {
      
    }
    
  }



}
