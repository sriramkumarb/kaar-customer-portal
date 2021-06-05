import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from './user'


@Injectable({
  providedIn: 'root'
})
export class VendorService {

  API_URL = environment.API_URL;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    let user: any = localStorage.getItem('vendor')
    this.currentUserSubject = new BehaviorSubject<any>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(data: any) {
    return this.http.post(this.API_URL + '/ven/login', { data })
  }

  logout() {
    localStorage.removeItem("vendor")
    this.currentUserSubject.next({});
  }

  getVendorDetails(data: any) {
    return this.http.post(this.API_URL + '/ven/details', { data })
  }

  updatevendorDetails(data: any) {
    return this.http.post(this.API_URL + '/ven/edit-details', { data })
  }

  getpaymentandaging(data: any) {
    return this.http.post(this.API_URL + '/ven/payment', { data })
  }

  getcreditdetails(data: any) {
    return this.http.post(this.API_URL + '/ven/credit', { data })
  }

  getdebitdetails(data: any) {
    return this.http.post(this.API_URL + '/ven/debit', { data })
  }

}
