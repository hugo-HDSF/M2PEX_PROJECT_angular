import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  username = this.authService.user?.username || '';
  items = [
    {
      label: 'Home',
      routerLink: 'home',
      icon: 'pi pi-home',
    },
    {
      label: 'Products',
      routerLink: 'products',
      icon: 'pi pi-shopping-cart',
    },
    {
      label: 'Contact',
      routerLink: 'contact',
      icon: 'pi pi-envelope',
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get isUserConnected() {
    return this.authService.isUserConnected();
  }

  get getUsername() {
    return this.authService.user?.username || '';
  }
}
