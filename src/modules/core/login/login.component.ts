import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { AlertType } from 'src/models/_enums/AlertTypeEnum';
import { AuthModel } from 'src/models/AuthModel';
import { AlertService } from 'src/services/alert.service';
import { AuthService } from 'src/services/auth.service';
import { CountriesService } from 'src/services/countries.service';
import { LoadingSpinnerService } from 'src/services/loading-spinner.service';
import { UsersService } from 'src/services/users.service';

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
    this.loader.start();
    const authModel: AuthModel = {
      field: this.loginForm.controls['field'].value,
      password: this.loginForm.controls['password'].value
    }
    this.authService.Login(authModel.field, authModel.password).pipe(finalize(() => {
      this.loader.stop();
    })).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('type', res.data.type);
        localStorage.setItem('email', res.data.email);
        this.router.navigate(['users']);
      },
      error: () => {
        this.alertService.fire(null, 'Oops...', 'Invalid Credentials', 'error');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
