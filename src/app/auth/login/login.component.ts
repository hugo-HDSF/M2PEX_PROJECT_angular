import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (user: any) => {
        if (user.length === 0) alert('Error in the username or password');
        this.authService.user = user[0];
        if (!this.authService.user) return;
        this.authService.saveUser();
        this.router.navigate(['/']);
      },
      (error) => {
        alert('Request error');
      },
    );
  }
}
