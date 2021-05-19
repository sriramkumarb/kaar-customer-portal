import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  url: any = '';
  user: string = '';
  customerDetails: any = '';
  disable = true;
  name = ''
  customerUpdatedDetails: FormGroup;
  res_status: any = '';

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {

    this.url = this.activatedRoute.snapshot;
    this.user = this.url._routerState.url
    this.user = this.user.slice(12)
    this.user = this.user.split('/')[0];

    this.customerUpdatedDetails = new FormGroup({
      name: new FormControl(''),
      name_2: new FormControl(''),
      customer_id: new FormControl(''),
      search_term: new FormControl(''),
      one_time_acc: new FormControl(''),
      telephone: new FormControl(''),
      fax_number: new FormControl(''),
      street: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      postal_code: new FormControl(''),
    })

  }

  ngOnInit(): void {
    this.userService.getCustomerDetails(this.user).subscribe((res: any) => {
      this.customerDetails = res

    })
  }

  enableEdit() {
    this.disable = !this.disable

  }

  updateCustomerDetails(data: any) {
    this.userService.editCustomerDetails(data).subscribe((res: any) => {

      if (res.res_data === 'SUCCESS') {
        this.res_status = res.message;
      }
    })

  }


}
