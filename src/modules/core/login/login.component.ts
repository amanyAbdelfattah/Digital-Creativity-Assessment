import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { AlertType } from 'src/models/_enums/AlertTypeEnum';
import { AuthModel } from 'src/models/AuthModel';
import { AlertService } from 'src/services/alert.service';
import { AuthService } from 'src/services/auth.service';
import { LoadingSpinnerService } from 'src/services/loading-spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  loginForm!: FormGroup;
  fieldTextType!: boolean;
  subscriptions: Subscription[] = [];

  constructor(
    public authService : AuthService,
    private router : Router,
    private loader: LoadingSpinnerService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
        field: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, Validators.required),
    });
  }

  onToggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  onSubmit() {
    this.authService.Login("admin@admin.com", "123456789", "admin").subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        this.alertService.fire(null, 'Oops...', 'Invalid Credentials', 'error');
      },
      complete: () => {
        this.loader.stop();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
