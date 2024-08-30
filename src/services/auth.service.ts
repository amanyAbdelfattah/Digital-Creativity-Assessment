import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/environments/Environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  Login(field: string, password: string) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Accept-Language': 'ar',
      'App-Version': '11',
      'Device-Name': 'iphone 11 pro',
      'Device-OS-Version': '13',
      'Device-UDID': '1234',
      'Device-Push-Token': '123456',
      'Device-Type': 'ios'
    })
    const formData = new FormData();
    formData.append('field', field);
    formData.append('password', password);
    return this.httpClient.post(`${Environment.baseUrl}auth/admin-login`, formData, { headers });
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  logOut() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login');
  }
}
