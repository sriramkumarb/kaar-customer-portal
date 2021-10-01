import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../service/index'

@Component({
  selector: 'app-ven-details',
  templateUrl: './ven-details.component.html',
  styleUrls: ['./ven-details.component.scss']
})
export class VenDetailsComponent implements OnInit {

  vendor: any
  vendorDetails: any = ''
  disable = true;
  res_status: any = '';
  error_msg: any = '';
  show: any = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private vendorservice: VendorService) {
    this.vendor = JSON.parse(localStorage.vendor).username

  }

  ngOnInit(): void {

    this.vendorservice.getVendorDetails(this.vendor).subscribe((res: any) => {
      console.log(res);
      this.vendorDetails = res
      this.show = false;
    })

  }

  enableEdit() {
    this.disable = !this.disable

  }

  updateVendorDetails(data: any) {
    this.vendorservice.updatevendorDetails(data).subscribe((res: any) => {
      if (res.res_status == 'S') {
        this.res_status = res.message
      }
      else {
        this.error_msg = res.message
      }

    })

  }

}
