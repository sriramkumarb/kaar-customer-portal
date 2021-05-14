import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  submitRegister(data: any) {
    return this.http.post(this.API_URL + '/register', { data })
  }
}
