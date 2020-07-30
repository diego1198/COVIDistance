import { Component, OnInit } from '@angular/core';

/* Import for Auth */
import { EmailService } from '../../services/email.service'
import { GoogleService } from '../../services/google.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private authEmail: EmailService,
              private authGoogle:GoogleService,
              private router: Router) { }


  ngOnInit() {
  }

  async loginEmail() {
    try {
      const user = await this.authEmail.login(this.email, this.password);
      if (user) {
        const isVerified = this.authEmail.isEmailVerified(user);
        this.redirectUser(isVerified)
      }
    } catch (error) {
      console.log(error)
    }

  }

  async loginGoogle() {
    try {
      const user = await this.authGoogle.loginGoogle()
      if(user){
        const isVerified = this.authGoogle.isEmailVerified(user)
        this.redirectUser(isVerified)
      }
    } catch (error) {
      
    }
  }

  redirectUser(isVerified:boolean){
    if(isVerified){
      this.router.navigate(['scanner']);
    }else{
      this.router.navigate(['verify-email']);
    }
  }

}
