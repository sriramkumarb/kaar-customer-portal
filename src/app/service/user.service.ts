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

  login(data: any) {
    return this.http.post(this.API_URL + '/login', { data })
  }

  getCustomerDetails(data: any) {
    return this.http.post(this.API_URL + '/userDetails', { data })
  }

  editCustomerDetails(data: any) {
    return this.http.post(this.API_URL + '/editUserDetails', { data })
  }

  getinquirylist(data: any) {
    return this.http.post(this.API_URL + '/getinqlist', { data })
  }

  getinquirydetails(data: any) {
    return this.http.post(this.API_URL + '/getinqdetails', { data })
  }

  getsaleorderlist(data: any) {
    return this.http.post(this.API_URL + '/getsolist', { data })
  }

}
