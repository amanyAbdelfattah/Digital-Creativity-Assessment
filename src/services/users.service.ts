import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/Environment';
import { UserFiltrationModel } from 'src/models/user/UserFiltrationModel';
import { UserListingModel } from 'src/models/user/UserListingModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userUpdated = new EventEmitter<any>();

  constructor(
    private httpClient: HttpClient
  ) { }

  GetAll(userFiltration?: UserFiltrationModel): Observable<UserListingModel[]> {
    const params: string[] = [];
    let url = `${Environment.baseUrl}users`;
    if (userFiltration) {
      if (userFiltration.type !== null && userFiltration.type !== undefined) {
        params.push(`type=${encodeURIComponent(userFiltration.type)}`);
      }
      if (userFiltration.gender !== null && userFiltration.gender !== undefined) {
        params.push(`gender=${encodeURIComponent(userFiltration.gender)}`);
      }
      if (userFiltration.is_premium !== null && userFiltration.is_premium !== undefined) {
        params.push(`is_premium=${userFiltration.is_premium ? 1 : null}`);
      }
    }
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }  
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Accept-Language': 'ar',
      'App-Version': '11',
      'Device-Name': 'iphone 11 pro',
      'Device-OS-Version': '13',
      'Device-UDID': '1234',
      'Device-Push-Token': '123456',
      'Device-Type': 'ios',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get<UserListingModel[]>(url, { headers });
  }

  ToggleActivation(userId: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Accept-Language': 'ar',
      'App-Version': '11',
      'Device-Name': 'iphone 11 pro',
      'Device-OS-Version': '13',
      'Device-UDID': '1234',
      'Device-Push-Token': '123456',
      'Device-Type': 'ios',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.httpClient.post(`${Environment.baseUrl}users/${userId}/activation`, {}, { headers });
  }

  CreateUser(name: string,
    father_name: string,
    grandfather_name: string,
    family_branch_name: string,
    gender: string,
    phone: string,
    email: string,
    password: string,
    password_confirmation: string,
    date_of_birth: string,
    country_id: string,
    phone_code: string,
    country_code: string,
    tribe: string,
    active: string,
    is_premium: string) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('father_name', father_name);
    formData.append('grandfather_name', grandfather_name);
    formData.append('family_branch_name', family_branch_name);
    formData.append('gender', gender);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', password_confirmation);
    formData.append('date_of_birth', date_of_birth);
    formData.append('country_id', country_id);
    formData.append('phone_code', phone_code);
    formData.append('country_code', country_code);
    formData.append('tribe', tribe);
    formData.append('active', active);
    formData.append('is_premium', is_premium);

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Accept-Language': 'ar',
      'App-Version': '11',
      'Device-Name': 'iphone 11 pro',
      'Device-OS-Version': '13',
      'Device-UDID': '1234',
      'Device-Push-Token': '123456',
      'Device-Type': 'ios',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.httpClient.post(`${Environment.baseUrl}users/create`, formData, { headers });
  }

  UpdateUser(id: number,
    name: string,
    father_name: string,
    grandfather_name: string,
    family_branch_name: string,
    gender: string,
    phone: string,
    email: string,
    date_of_birth: string,
    country_id: string,
    phone_code: string,
    country_code: string,
    tribe: string,
    active: string,
    is_premium: string) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('father_name', father_name);
    formData.append('grandfather_name', grandfather_name);
    formData.append('family_branch_name', family_branch_name);
    formData.append('gender', gender);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('date_of_birth', date_of_birth);
    formData.append('country_id', country_id);
    formData.append('phone_code', phone_code);
    formData.append('country_code', country_code);
    formData.append('tribe', tribe);
    formData.append('active', active);
    formData.append('is_premium', is_premium);

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Accept-Language': 'ar',
      'App-Version': '11',
      'Device-Name': 'iphone 11 pro',
      'Device-OS-Version': '13',
      'Device-UDID': '1234',
      'Device-Push-Token': '123456',
      'Device-Type': 'ios',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.httpClient.post(`${Environment.baseUrl}users/${id}/edit`, formData, { headers });
  }
}
