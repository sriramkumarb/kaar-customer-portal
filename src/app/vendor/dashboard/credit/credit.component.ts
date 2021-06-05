import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../service/index'
@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit {

  credit = true;
  user: string = '';
  credit_data: any = [];
  debit_data: any = [];
  source: LocalDataSource;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private vendorService: VendorService) {

    this.user = JSON.parse(localStorage.vendor).username

    this.source = new LocalDataSource(this.credit_data)

    this.vendorService.getcreditdetails(this.user).subscribe((res: any) => {

      res.map((o: any) => {
        o.VENDOR = this.user
      })
      // console.log(res)
      this.credit_data = res
      this.source = new LocalDataSource(this.credit_data)
    })
  }

  ngOnInit(): void {
  }

  enablecredit() {
    // console.log('credit');
    this.credit = true;
    this.vendorService.getcreditdetails(this.user).subscribe((res: any) => {

      res.map((o: any) => {
        o.VENDOR = this.user
      })
      // console.log(res)
      this.credit_data = res
      this.source = new LocalDataSource(this.credit_data)
    })
  }

  enabledebit() {
    // console.log('debit');
    this.credit = false;
    this.vendorService.getdebitdetails(this.user).subscribe((res: any) => {
      res.map((o: any) => {
        o.VENDOR = this.user
      })
      // console.log(res)
      this.debit_data = res
      this.source = new LocalDataSource(this.debit_data)

    })

  }

  settings = {
    columns: {
      VENDOR: {
        title: 'VENDOR',
        filter: false
      },
      AUGBL: {
        title: 'AUGBL',
        filter: false
      },
      AUGDT: {
        title: 'AUGDT',
        filter: false
      },
      BELNR: {
        title: 'BELNR',
        filter: false
      },
      BUZEI: {
        title: 'BUZEI',
        filter: false
      },
      GJAHR: {
        title: 'GJAHR',
        filter: false
      },
      PSWBT: {
        title: 'PSWBT',
        filter: false
      },
      PSWSL: {
        title: 'PSWSL',
        filter: false
      },
      ZFBDT: {
        title: 'ZFBDT',
        filter: false
      },
    },
    attr: {
      class: 'table table-bordered'
    },
    actions: false,
    pager: {
      perPage: 100,
    },
    hideSubHeader: true,
    mode: 'inline',
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      {
        field: 'VENDOR',
        search: query
      },
      {
        field: 'AUGBL',
        search: query
      },
      {
        field: 'AUGDT',
        search: query
      },
      {
        field: 'BELNR',
        search: query
      },
      {
        field: 'BUZEI',
        search: query
      },
      {
        field: 'GJAHR',
        search: query
      },
      {
        field: 'PSWBT',
        search: query
      },
      {
        field: 'PSWSL',
        search: query
      },
      {
        field: 'ZFBDT',
        search: query
      },
    ], false);
  }


}
