import { Component, OnInit } from '@angular/core';

import { FormBuilder,Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authEmail:EmailService,private formBuilder: FormBuilder,private router:Router) { }

  registrationForm = this.formBuilder.group({
    name:['',[Validators.required,Validators.maxLength(50)]],
    lastName:['',[Validators.required,Validators.maxLength(50)]],
    email:['',
          [
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$")
          ]],
    password:['',[Validators.required,Validators.minLength(8)]]
  });

  

  public errorMessages = {
    name:[
      {type: "required", message : "El nombre es obligatorio"},
      {type: "maxlength",message : "Tu nombre no puede tener mas de 50 caracteres"}
    ],
    lastName:[
      {type: "required", message : "El apellido es obligatorio"},
      {type: "maxlength",message : "Tu apellido no puede tener mas de 50 caracteres"}
    ],
    email:[
      {type: "required", message : "El email es obligatorio"},
      {type: "pattern",message : "Por favor ingresa un email valido"}
    ],
    password:[
      {type: "required", message : "La contraseña es obligatoria"},
      {type: "minlength",message : "La contraseña no puede tener menos de 8 caracteres"}
    ]
  }

  
  ngOnInit() {
  }

  get name(){
    return this.registrationForm.get('name');
  }

  get lastName(){
    return this.registrationForm.get('lastName');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get password(){
    return this.registrationForm.get('password');
  }

  registerUser(){
    try {
      const user = this.authEmail.register(this.registrationForm.controls['email'].value,
                                           this.registrationForm.controls['password'].value)
      if(user){
        
      }
    } catch (error) {
      console.log(error)
    }
    
  }



}
