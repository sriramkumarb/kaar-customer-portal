import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(this.API_URL + '/ven/login', { data })
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

}
