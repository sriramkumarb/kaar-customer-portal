import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = environment.API_URL;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    let user: any = localStorage.getItem('user')
    this.currentUserSubject = new BehaviorSubject<any>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  submitRegister(data: any) {
    return this.http.post(this.API_URL + '/cus/register', { data })
  }

  login(data: any) {
    return this.http.post(this.API_URL + '/cus/login', { data })
  }

  logout() {
    localStorage.removeItem("user")
    this.currentUserSubject.next({});
  }

  getCustomerDetails(data: any) {
    return this.http.post(this.API_URL + '/cus/userDetails', { data })
  }

  editCustomerDetails(data: any) {
    return this.http.post(this.API_URL + '/cus/editUserDetails', { data })
  }

  getinquirylist(data: any) {
    return this.http.post(this.API_URL + '/cus/getinqlist', { data })
  }

  getinquirydetails(data: any) {
    return this.http.post(this.API_URL + '/cus/getinqdetails', { data })
  }

  getsaleorderlist(data: any) {
    return this.http.post(this.API_URL + '/cus/getsolist', { data })
  }

  getsaleorderdetails(data: any) {
    return this.http.post(this.API_URL + '/cus/getsodetails', { data })
  }

  getdeliverylist(data: any) {
    return this.http.post(this.API_URL + '/cus/getdellist', { data })
  }

  getdeliverydetails(data: any) {
    return this.http.post(this.API_URL + '/cus/getdeldetails', { data })
  }

  getcreditmemo(data: any) {
    return this.http.post(this.API_URL + '/cus/getcredit', { data })
  }

  getdebitmemo(data: any) {
    return this.http.post(this.API_URL + '/cus/getdebit', { data })
  }

  getpaymentaging(data: any) {
    return this.http.post(this.API_URL + '/cus/getpa', { data })
  }

  uploadmasterdata(data: any) {
    return this.http.post(this.API_URL + '/cus/uploadmasterdata', { data })
  }

}
