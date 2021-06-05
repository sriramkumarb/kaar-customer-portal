import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  user: string = '';
  payment_data: any = []
  source: LocalDataSource;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private vendorservice: VendorService) {
    this.user = JSON.parse(localStorage.vendor).username;

    this.source = new LocalDataSource(this.payment_data);

    this.vendorservice.getpaymentandaging(this.user).subscribe((res: any) => {

      res.map((o: any) => {
        o.AGING = this.diff(
          Date.parse(o.ENTRY_DATE),
          Date.parse(o.BLINE_DATE))

      })

      this.payment_data = res;

      this.source = new LocalDataSource(this.payment_data);

    })
  }

  diff(a: any, b: any) {
    a = new Date(a)
    b = new Date(b)

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc2 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc1 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  ngOnInit(): void {
  }

  settings = {
    columns: {
      VENDOR: {
        title: 'VENDOR',
        filter: false,
      },
      COMP_CODE: {
        title: 'COMP_CODE',
        filter: false,
      },
      FISC_YEAR: {
        title: 'FISC_YEAR',
        filter: false,
      },
      DOC_NO: {
        title: 'DOC_NO',
        filter: false,
      },
      ENTRY_DATE: {
        title: 'ENTRY_DATE',
        filter: false,
      },
      CURRENCY: {
        title: 'CURRENCY',
        filter: false,
      },
      REF_DOC_NO: {
        title: 'REF_DOC_NO',
        filter: false,
      },
      DOC_TYPE: {
        title: 'DOC_TYPE',
        filter: false,
      },
      BLINE_DATE: {
        title: 'BLINE_DATE',
        filter: false,
      },
      AGING: {
        title: 'AGING',
        filter: false,
      },
      AMOUNT: {
        title: 'AMOUNT',
        filter: false,
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
  };

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to inclue in the search
      {
        field: 'COMP_CODE',
        search: query,
      },
      {
        field: 'VENDOR',
        search: query,
      },
      {
        field: 'FISC_YEAR',
        search: query,
      },
      {
        field: 'DOC_NO',
        search: query,
      },
      {
        field: 'ENTRY_DATE',
        search: query,
      },
      {
        field: 'CURRENCY',
        search: query,
      },
      {
        field: 'REF_DOC_NO',
        search: query,
      },
      {
        field: 'DOC_TYPE',
        search: query,
      },
      {
        field: 'BLINE_DATE',
        search: query,
      },
      {
        field: 'AGING',
        search: query,
      },
      {
        field: 'AMOUNT',
        search: query,
      },
    ], false);
  }

}
