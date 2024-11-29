import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: this.checkPasswords },
    );
  }

  addUser() {
    console.log('hello');
    if (this.registerForm.invalid) return;
    this.authService.addUser({
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
    });
    this.router.navigate(['/login']);
  }

  private checkPasswords(control: FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value !== confirmPassword?.value
      ? { missMatch: true }
      : null;
  }

  get getErrorLabel() {
    if (this.registerForm.errors?.['required'])
      return 'The fields are required';
    if (!!this.registerForm.controls?.['password']?.errors?.['minlength'])
      return `The minimum length for your password is ${this.registerForm.controls?.['password']?.errors?.['minlength']?.requiredLength}`;
    if (this.registerForm.errors?.['missMatch'])
      return 'Passwords do not match';
    return 'An error occurred';
  }
}
