import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service';

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
  res_status: any = '';
  show: any = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {

    this.user = JSON.parse(localStorage.user).username

  }

  ngOnInit(): void {
    this.userService.getCustomerDetails(this.user).subscribe((res: any) => {
      this.customerDetails = res
      this.show = false;
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
