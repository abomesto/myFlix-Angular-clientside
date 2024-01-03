import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  toLogout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}

