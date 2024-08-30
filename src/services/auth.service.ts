import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/Environment';
import { AuthModel } from 'src/models/AuthModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  Login(field: string, password: string, type: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Accept': '*',
      'Accept-Language': 'ar',
      'Cache-Control': 'no-cache, private',
      'Access-Control-Allow-Origin': '*'
    });
    const formData = new FormData();
    formData.append('field', field);
    formData.append('password', password);
    formData.append('type', type);
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
