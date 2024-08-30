import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  constructor(
    public authService: AuthService
  ) {}
}
