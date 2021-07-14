import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from './user'
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  API_URL = environment.API_URL;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    let user: any = localStorage.getItem('employee')
    this.currentUserSubject = new BehaviorSubject<any>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(data: any) {
    return this.http.post(this.API_URL + '/emp/login', { data })
  }

  logout() {
    localStorage.removeItem("employee")
    this.currentUserSubject.next({});
  }

  getEmployeeDetails(data: any) {
    return this.http.post(this.API_URL + '/emp/details', { data })
  }

  editEmployeeDetails(data: any) {
    return this.http.post(this.API_URL + '/emp/edit', { data })
  }

  getEmployeeLeaveDetails(data: any) {
    return this.http.post(this.API_URL + '/emp/leave-details', { data })
  }

  createEmployeeLeaveRequest(data: any) {
    return this.http.post(this.API_URL + '/emp/leave-request', { data })
  }

  getEmployeeLeaveTypes(data: any) {
    return this.http.post(this.API_URL + '/emp/leave-types', { data })
  }

  getSalaryPaySlip(data: any) {
    return this.http.post(this.API_URL + '/emp/pay-slip', { data })
  }

  getSalaryPaySlipDetails(data: any) {
    return this.http.post(this.API_URL + '/emp/pay-slip/details', { data })
  }

  getFinalSettlementDetails(data: any) {
    return this.http.post(this.API_URL + '/emp/ffs', { data })
  }
}
