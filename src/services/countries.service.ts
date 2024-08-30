import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/Environment';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  GetAll() {
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
    return this.httpClient.get(`${Environment.baseUrl}countries`, {headers});
  }
}
