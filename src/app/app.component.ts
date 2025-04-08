import { Component } from '@angular/core';
import { UserComponent } from "./user/user.component";
import { HeaderComponent } from './header/header.component';
import { DUMMY_USERS } from './dummy-users';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  users = DUMMY_USERS;
}
