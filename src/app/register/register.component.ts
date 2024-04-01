import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.myForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      repeatPassword: ['', Validators.required]
    });
  }

  saveUser() {
    const email = this.myForm.get('email')?.value;
    const password = this.myForm.get('password')?.value;
    const repeatPassword = this.myForm.get('repeatPassword')?.value;
    if (password !== repeatPassword) {
      this.errorMessage = "Passwords do not match";
      return;
    }
    const userData = {
      firstname: this.myForm.get('firstname')?.value,
      lastname: this.myForm.get('lastname')?.value
    };
    this.authservice.signUpAndSaveData(email, password, userData)
      .then(() => {
        // Redirection après l'inscription réussie
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error:', error);
        this.errorMessage = error.message;
      });
  }
}
