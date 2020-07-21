import { Component, OnInit } from '@angular/core';

import { EmailService } from "../../services/email.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email:string;

  constructor(private authEmail:EmailService,private router:Router) { }

  ngOnInit() {
  }

  async resetPasswrod(){
    try {
      await this.authEmail.resetPassword(this.email);
      this.router.navigate(['/login'])
    } catch (error) {
      console.log(error)
    }
    
  }

}
