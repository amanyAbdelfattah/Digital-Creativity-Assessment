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
  userUpdated = new EventEmitter<UserListingModel>();

  constructor(
    private httpClient: HttpClient
  ) { }

  GetAll(userFiltration?: UserFiltrationModel): Observable<UserListingModel[]> {
    debugger
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
}
