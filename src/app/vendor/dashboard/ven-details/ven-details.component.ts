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


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private vendorservice: VendorService) {
    this.vendor = JSON.parse(localStorage.vendor).username

  }

  ngOnInit(): void {

    this.vendorservice.getVendorDetails(this.vendor).subscribe((res: any) => {
      console.log(res);
      this.vendorDetails = res

    })

  }

  enableEdit() {
    this.disable = !this.disable

  }

}
