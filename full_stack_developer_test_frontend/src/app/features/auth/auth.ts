import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'],
})
export class Auth {

}
